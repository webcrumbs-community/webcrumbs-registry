import os
import yaml
import sys

def generate_yaml(folder_name):
    # Define the YAML content
    data = {
        'name': f'deploy-{folder_name}',
        'on': {
            'push': {
                'branches': ['main', 'master'],
                'paths': [f'{folder_name}/**']
            }
        },
        'defaults': {
            'run': {
                'working-directory': folder_name
            }
        },
        'jobs': {
            'build': {
                'runs-on': 'ubuntu-latest',
                'steps': [
                    {'uses': 'actions/checkout@v4'},
                    {'run': 'npm install'},
                    {
                        'run': 'npm run build',
                        'env': {
                            'PRODUCTION_DOMAIN': '${{ secrets.PRODUCTION_DOMAIN }}'
                        }
                    },
                    {
                        'run': 'aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/' + folder_name + '/latest',
                        'env': {
                            'AWS_ACCESS_KEY_ID': '${{ secrets.AWS_ACCESS_KEY_ID }}',
                            'AWS_SECRET_ACCESS_KEY': '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
                            'AWS_DEFAULT_REGION': 'sa-east-1'
                        }
                    },
                    {
                        'run': 'aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "/' + folder_name + '/index.html" "/' + folder_name + '/remoteEntry.js"',
                        'env': {
                            'AWS_ACCESS_KEY_ID': '${{ secrets.AWS_ACCESS_KEY_ID }}',
                            'AWS_SECRET_ACCESS_KEY': '${{ secrets.AWS_SECRET_ACCESS_KEY }}',
                            'AWS_DEFAULT_REGION': 'sa-east-1'
                        }
                    }
                ]
            }
        }
    }

    # Write to a new YAML file
    yaml_file_path = os.path.join(folder_name, '.github', 'workflows', f'deploy_{folder_name}.yml')
    os.makedirs(os.path.dirname(yaml_file_path), exist_ok=True)

    with open(yaml_file_path, 'w') as file:
        yaml.dump(data, file)

if __name__ == '__main__':
    folder_name = sys.argv[1] if len(sys.argv) > 1 else None
    
    if folder_name:
        generate_yaml(folder_name)
    else:
        print("Hey, no folder name provided. It's like making a cake without any sugar!")
