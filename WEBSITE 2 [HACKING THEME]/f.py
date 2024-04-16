import cv2
import mediapipe as mp 
import numpy as np
import pyautogui

mp_hands = mp.solutions.hands
hands = mp_hands.Hands()

cap = cv2.VideoCapture(0)

screen_width, screen_height = pyautogui.size()

while True:
    ret, frame = cap.read()
    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            
            index_x = int(hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].x * frame.shape[1])
            index_y = int(hand_landmarks.landmark[mp_hands.HandLandmark.INDEX_FINGER_TIP].y * frame.shape[0])
            
            x = np.interp(index_x, (0, frame.shape[1]), (0, screen_width))
            y = np.interp(index_y, (0, frame.shape[0]), (0, screen_height))
            
            pyautogui.moveTo(x, y)
            
            # Check for clicks
            thumb_x = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].x
            thumb_y = hand_landmarks.landmark[mp_hands.HandLandmark.THUMB_TIP].y
            
            middle_x = hand_landmarks.landmark[mp_hands.HandLandmark.MIDDLE_FINGER_TIP].x
            
            if abs(thumb_x - index_x) < 0.05 and abs(thumb_y - index_y) < 0.05:
                pyautogui.click()
                
            if abs(middle_x - index_x) < 0.05:
                pyautogui.click(button='right')

    cv2.imshow('Frame', frame)
    
    if cv2.waitKey(1) == ord('q'):
        break
        
cap.release()
cv2.destroyAllWindows()
