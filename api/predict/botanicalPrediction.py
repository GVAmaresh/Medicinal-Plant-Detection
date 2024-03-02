from ultralytics import YOLO
import subprocess
import os
def BotanicalPre(image_path):
    print(image_path)
    model_path = "./best.pt"
    command = f"yolo detect mode=predict model={model_path} source={image_path}"
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    print(result)
    output_lines = result.stdout.split('\n')
    print(output_lines)
    for line in output_lines:
        if " 1 " in line:
            print(line)
            a = line.index(" 1 ") + 3
            b = line[a:].index(",")
            # os.remove(image_path)
            print("output = ", line[a:a +b])
            return line[a:a +b]
    return "Please use detailed Image"
    