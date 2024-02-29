from ultralytics import YOLO
def BotanicalPre(image_path):
    model = YOLO('yolov8n.pt')
    yolo_output = model(image_path)
    print(yolo_output)
    detect = yolo_output[3].index(" 1 ")
    objects = yolo_output[3][detect:].split(",")[:-1]
    print(" ----------------------------------------------------   ")

    print("Detected Objects: ")
    print()
    for i in objects:
        i = i.strip()
    split_name = i.split(" ")
    return split_name[0]
    # print(" ".join(split_name[1:]))