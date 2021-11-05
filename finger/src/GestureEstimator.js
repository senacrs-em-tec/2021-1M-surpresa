import FingerPoseEstimator from './FingerPoseEstimator';
import { Finger, FingerCurl, FingerDirection } from './FingerDescription';

export default class GestureEstimator {

  constructor(knownGestures, estimatorOptions = {}) {

    this.estimator = new FingerPoseEstimator(estimatorOptions);

    this.gestures = knownGestures;
  }

  estimate(landmarks, minConfidence) {

    let gesturesFound = [];

    const est = this.estimator.estimate(landmarks);

    let debugInfo = [];
    for(let fingerIdx of Finger.all) {
      debugInfo.push([
        Finger.getName(fingerIdx),
        FingerCurl.getName(est.curls[fingerIdx]),
        FingerDirection.getName(est.directions[fingerIdx])
      ]);
    }

    for(let gesture of this.gestures) {
      let confidence = gesture.matchAgainst(est.curls, est.directions);
      if(confidence >= minConfidence) {
        gesturesFound.push({
          name: gesture.name,
          confidence: confidence
        });
      }
    }

    return {
      poseData: debugInfo,
      gestures: gesturesFound
    };
  }
}