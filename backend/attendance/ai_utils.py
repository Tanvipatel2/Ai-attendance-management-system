import cv2
import numpy as np


def compare_faces(registered_path, live_path):
    registered_img = cv2.imread(registered_path, 0)
    live_img = cv2.imread(live_path, 0)

    if registered_img is None or live_img is None:
        return False, 0

    face_cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )

    registered_faces = face_cascade.detectMultiScale(registered_img, 1.3, 5)
    live_faces = face_cascade.detectMultiScale(live_img, 1.3, 5)

    if len(registered_faces) == 0 or len(live_faces) == 0:
        return False, 0

    x, y, w, h = registered_faces[0]
    reg_face = registered_img[y:y+h, x:x+w]

    x, y, w, h = live_faces[0]
    live_face = live_img[y:y+h, x:x+w]

    reg_face = cv2.resize(reg_face, (200, 200))
    live_face = cv2.resize(live_face, (200, 200))

    difference = cv2.absdiff(reg_face, live_face)
    score = 100 - (np.mean(difference) / 255 * 100)

    return score >= 55, round(score, 2)