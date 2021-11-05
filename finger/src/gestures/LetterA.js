import { Finger, FingerCurl, FingerDirection } from "../FingerDescription";
import GestureDescription from "../GestureDescription";

const aDescription = new GestureDescription("a");

aDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.5);
aDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
aDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
aDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    thumbsUpDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
    thumbsUpDescription.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  }

aDescription.setWeight(Finger.Index, 2);
aDescription.setWeight(Finger.Middle, 2);
aDescription.setWeight(Finger.Ring, 2);
aDescription.setWeight(Finger.Pinky, 2);

export default aDescription;
