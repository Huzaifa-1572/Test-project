import * as faceDetection from "@tensorflow-models/face-detection";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateModelState } from "src/Redux/Reducers/FaceDetectionModelState";

export const useFaceDetectionModels = () => {
    const [models, setModels] = useState({ detectionModel: null, landmarksModel: null });
    const dispatch = useDispatch()

    useEffect(() => {
        const loadModels = async () => {
            await tf.setBackend("webgl");
            const detectionModel = await faceDetection.createDetector(
                faceDetection.SupportedModels.MediaPipeFaceDetector,
                { runtime: "tfjs", modelType: "short" }
            );
            const landmarksModel = await faceLandmarksDetection.createDetector(
                faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                { runtime: "tfjs" }
            );
            console.log("Models loaded successfully!");
            setModels({ detectionModel, landmarksModel });
        };

        loadModels();
    }, []);

    dispatch(updateModelState(models))

};