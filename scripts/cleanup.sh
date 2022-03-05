set -eux

rm -rf ../../CyberAgentHack/web-speed-hackathon-2022
mkdir -p ../../CyberAgentHack/web-speed-hackathon-2022
git clone . ../../CyberAgentHack/web-speed-hackathon-2022

cd ../../CyberAgentHack/web-speed-hackathon-2022
rm -rf .git tmp
yarn install

git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/CyberAgentHack/web-speed-hackathon-2022.git
git push -f -u origin main
