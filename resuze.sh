for name in $( ls . | grep .webp$ ); do 
    wh=`identify -format '%w,%h' ${name}`
    width=`echo $wh | cut -d, -f1`
    height=`echo $wh | cut -d, -f2`
    # echo $ $height
    npx @squoosh/cli --resize '{"enabled":true,"width":'${$((width/2.5))}',"height":'${$((height/2.5))}',"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":0,"target_size":0,"target_PSNR":0,"method":6,"sns_strength":0,"filter_strength":0,"filter_sharpness":7,"filter_type":1,"partitions":0,"segments":1,"pass":1,"show_compressed":0,"preprocessing":1,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":0,"alpha_quality":0,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":1}' ${name}
done
