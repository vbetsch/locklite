#!/bin/bash

# VARIABLES
env_source_file_path='/srv/.env.locklite'
project_name='locklite'
prod_branch_name='220-automate-the-deployment-process' # main
prod_folder_name='locklite-test' # locklite-prod
prod_root_path='/srv'
tmp_root_path='/tmp'
tmp_folder_name='locklite-tmp'

# CHECK - PROD FOLDER EXISTS
if [ ! -d "$prod_root_path/$prod_folder_name" ]; then
  echo 'ERROR: PROD FOLDER NOT EXISTS'
  exit 0
fi

# STEP 0 - REMOVE TMP FOLDER IF EXISTS
if [ -d "$tmp_root_path/$tmp_folder_name" ]; then
  rm -rf $tmp_root_path/$tmp_folder_name
fi

# STEP 1 - CLONE PROJECT IN TMP AND RENAME IT
cd $tmp_root_path
git clone "git@github.com:vbetsch/$project_name.git"
mv $project_name $tmp_folder_name

# STEP 2 - CHECKOUT PROD BRANCH
cd $tmp_folder_name
git checkout $prod_branch_name

# STEP 3 - BUILD APP
npm install
npm run build

# STEP 4 - REPLACE FILES IN PROD
sudo rm -rf $prod_root_path/$prod_folder_name/*
sudo cp $env_source_file_path .env
cd $tmp_root_path/$tmp_folder_name
sudo mv .next/ docker-compose.prod.yml $prod_root_path/$prod_folder_name/

# STEP X - REMOVE TMP FOLDER
rm -rf $tmp_root_path/$tmp_folder_name
