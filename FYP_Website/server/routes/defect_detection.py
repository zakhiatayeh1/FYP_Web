import asyncio
import websockets
import os
import cv2
from inference_sdk import InferenceHTTPClient
import pandas as pd

async def receive_image():
    # uri = "ws://172.20.10.2:8765"  # Replace with the Raspberry Pi IP (3G)
    uri = "ws://192.168.1.14:8765" # HOME WIFI
    timeout_duration = 30  # Set your desired timeout duration (in seconds)

    async with websockets.connect(uri, timeout=timeout_duration) as websocket:
        image_path = "received_image.jpg"
        with open(image_path, "wb") as image_file:
            while True:
                try:
                    # Use asyncio.wait_for to set a timeout for receiving messages
                    image_data = await asyncio.wait_for(websocket.recv(), timeout=timeout_duration)
                except asyncio.TimeoutError:
                    print("Timeout while waiting for image data.")
                    return

                if image_data == b"Image not found.":
                    print("Image not found.")
                    return
                if image_data == b"EOF":
                    print("End of image transfer.")
                    break
                image_file.write(image_data)

        print(f"Image received and saved as '{image_path}'.")
        defect_status=run_inference(image_path)
        print(defect_status)

def run_inference(image_path):
    CLIENT = InferenceHTTPClient(
        api_url="https://detect.roboflow.com",
        api_key="y7ZJ6AaP1y4KJvC6ID95"
    )

    result = CLIENT.infer(image_path, model_id="bike_model-mwfhg/1")
    image = cv2.imread(image_path)

    if image is None:
        print("Error loading image.")
        return

    object_counts = {
        "wheelsrotation": 0,
        "framerotation": 0,
        "seatrotation": 0,
        "handlerotation": 0,
        "pedalsrotation": 0
    }

    for prediction in result['predictions']:
        obj_class = prediction['class']
        if obj_class in object_counts:
            object_counts[obj_class] += 1
        x = int(prediction['x'] - prediction['width'] / 2)
        y = int(prediction['y'] - prediction['height'] / 2)
        width = int(prediction['width'])
        height = int(prediction['height'])
        confidence = prediction['confidence']
        cv2.rectangle(image, (x, y), (x + width, y + height), (0, 255, 0), 2)
        label = f"{obj_class} ({confidence:.2f})"
        cv2.putText(image, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    output_path = r"C:\Users\user\Desktop\bike_images\output_with_boxes.jpg"
    cv2.imwrite(output_path, image)
    os.startfile(output_path)

    expected_counts = {
        "wheelsrotation": 2,
        "framerotation": 1,
        "seatrotation": 1,
        "handlerotation": 1,
        "pedalsrotation": 1
    }

    defects = []
    for part, expected_count in expected_counts.items():
        actual_count = object_counts[part]
        if actual_count < expected_count:
            defects.append(f"Missing {expected_count - actual_count} {part}(s)")
        elif actual_count > expected_count:
            defects.append(f"Too many {actual_count - expected_count} {part}(s)")

    if not defects:
        print("Bike has no defects.")
        return 1
    else:
        print("Bike has defect(s):")
        for defect in defects:
            print(f"- {defect}")

        df = pd.DataFrame(defects, columns=["Defect Description"])
        print(df.head())
        df.to_csv('./df.csv', index=False)
        return 0

async def main():
    await receive_image()

if __name__ == "__main__":
    asyncio.run(main())
