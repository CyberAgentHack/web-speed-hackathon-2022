for file in `\find ./public/assets/images -maxdepth 1 -type f`; do
	npx @squoosh/cli --resize '{"enabled":true,"width":1024}' --avif '{}' --output-dir ./public/assets/images/resized/ $file
done
