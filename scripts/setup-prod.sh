#!/bin/bash

# VARIABLES
env_source_file_path='/srv/.env.locklite'
project_name='locklite'
prod_branch_name='220-automate-the-deployment-process' # main
prod_folder_name='locklite-prod'
prod_root_path='/srv'
tmp_root_path='/tmp'
tmp_folder_name='locklite-tmp'

# STEP 0 - CLEAN
if [ ! -d "$prod_root_path/$prod_folder_name" ]; then
  mkdir -pv "$prod_root_path/$prod_folder_name"
fi

if [ -d "$tmp_root_path/$tmp_folder_name" ]; then
  rm -rfv $tmp_root_path/$tmp_folder_name
fi

# STEP 1 - CLONE PROJECT IN TMP AND RENAME IT
cd $tmp_root_path
git clone "git@github.com:vbetsch/$project_name.git"
mv -v $project_name $tmp_folder_name

# STEP 2 - CHECKOUT PROD BRANCH
cd $tmp_folder_name
git checkout $prod_branch_name

# STEP 3 - BUILD APP
npm install
npm run build

# STEP 4 - REPLACE FILES IN PROD
sudo rm -rfv $prod_root_path/$prod_folder_name/
sudo mkdir -pv $prod_root_path/$prod_folder_name/
sudo cp -v $env_source_file_path $prod_root_path/$prod_folder_name/.env
cd $tmp_root_path/$tmp_folder_name
sudo mv -v .next/ node_modules/ docker-compose.prod.yml package.json scripts/run-prod.sh $prod_root_path/$prod_folder_name/

# STEP 5 - REMOVE TMP FOLDER
rm -rfv $tmp_root_path/$tmp_folder_name
