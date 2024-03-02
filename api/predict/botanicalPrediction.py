from ultralytics import YOLO
import subprocess
import os
def BotanicalPre(image_path):
    print(image_path)
    model_path = "./images/best.pt"
    if not os.path.exists(model_path):
        print("Error: best.pt file not found at:", model_path)
        return "Please use detailed Image"
    command = f"yolo detect mode=predict model={model_path} source={image_path} "
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.stdout is not None:
        output_lines = result.stdout.split('\n')
        for line in output_lines:
            if " 1 " in line:
                print(line)
                a = line.index(" 1 ") + 3
                b = line[a:].index(",")
                # os.remove(image_path)
                return line[a:a +b]
    else:
        print("Error: No output captured")
        return "Please use detailed Image"
