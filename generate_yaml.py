import os
import yaml


def get_top_folders():
    return [
        f.name
        for f in os.scandir("./")
        if f.is_dir() and f.name != "plugins" and not f.name.startswith(".")
    ]


def get_plugin_folders():
    return [
        f"plugins/{f.name}"
        for f in os.scandir("./plugins")
        if f.is_dir() and not f.name.startswith(".")
    ]


def generate_yaml(path):
    folder_name = path.replace("/", "-")
    # Define the YAML content
    data = {
        "name": f"deploy-{folder_name}",
        "on": {"push": {"branches": ["main", "master"], "paths": [f"{path}/**"]}},
        "defaults": {"run": {"working-directory": path}},
        "jobs": {
            "build": {
                "runs-on": "ubuntu-latest",
                "steps": [
                    {"uses": "actions/checkout@v4"},
                    {"run": "npm install"},
                    {
                        "run": "npm run build",
                        "env": {"PRODUCTION_DOMAIN": "${{secrets.PRODUCTION_DOMAIN}}"},
                    },
                    {
                        "name": "Upload to S3",
                        "run": "aws s3 sync dist s3://${{secrets.AWS_S3_BUCKET_NAME}}/"
                        + path
                        + "/latest",
                        "env": {
                            "AWS_ACCESS_KEY_ID": "${{secrets.AWS_ACCESS_KEY_ID}}",
                            "AWS_SECRET_ACCESS_KEY": "${{secrets.AWS_SECRET_ACCESS_KEY}}",
                            "AWS_DEFAULT_REGION": "sa-east-1",
                        },
                    },
                    {
                        "name": "Create Invalidation",
                        "run": 'aws cloudfront create-invalidation --distribution-id ${{secrets.AWS_DISTRIBUTION_ID}} --paths "/'
                        + path
                        + '/index.html" "/'
                        + path
                        + '/remoteEntry.js"',
                        "env": {
                            "AWS_ACCESS_KEY_ID": "${{secrets.AWS_ACCESS_KEY_ID}}",
                            "AWS_SECRET_ACCESS_KEY": "${{secrets.AWS_SECRET_ACCESS_KEY}}",
                            "AWS_DEFAULT_REGION": "sa-east-1",
                        },
                    },
                    {
                        "name": "Verify Deployment",
                        "run": f"""bash -c "
                            status=$(curl -o /dev/null -s -w '%{{http_code}}' https://\${{{{secrets.AWS_CLOUDFRONT_DOMAIN}}}}/{path}/latest/remoteEntry.js);
                            echo 'Status:' $status;
                            if [ -z \"$status\" ]; then
                                echo 'Error: Status code is empty.';
                                exit 1;
                            elif [ \"$status\" -ne 200 ]; then
                                echo 'Error: File failed to deploy properly.';
                                exit 1;
                            fi"
                        """,
                    },
                ],
            }
        },
    }

    # Write to a new YAML file
    yaml_file_path = f"./.github/workflows/deploy-{folder_name}.yml"
    os.makedirs(os.path.dirname(yaml_file_path), exist_ok=True)

    with open(yaml_file_path, "w") as file:
        yaml.dump(data, file)


if __name__ == "__main__":
    top_folders = get_top_folders()
    plugin_folders = get_plugin_folders()

    all_folders = top_folders + plugin_folders

    for folder in all_folders:
        if folder:
            generate_yaml(folder)
