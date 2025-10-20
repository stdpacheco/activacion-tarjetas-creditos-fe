import { FC, Dispatch, SetStateAction, useEffect, useRef, useContext } from "react";
import { FPhi } from "@facephi/selphi-widget-web";
import styles from "./styles.module.scss";
import { RecoveryContext } from "@/usecases/contexts/useRecoveryContext";

const FPhiCameraResolutions: MapType = {
  res480p: { title: "640x480", width: 640, height: 480 },
  res600p: { title: "800x600", width: 800, height: 600 },
  res768p: { title: "1024x768", width: 1024, height: 768 },
  res720p: { title: "1280x720 (720p)", width: 1280, height: 720 },
  res1080p: { title: "1920x1080 (1080p)", width: 1920, height: 1080 },
};

interface FacephiWidgetProps {
  isCaptureStarted: boolean;
  setIsCaptureStarted: Dispatch<SetStateAction<boolean>>;
  setImageTokenize?: (base64: string) => void;
}

export const FacephiWidget: FC<FacephiWidgetProps> = (props) => {
  const { setBase64Image, cameraStreamRef } = useContext(RecoveryContext);

  const widgetBundlePath =
    import.meta.env.MODE === "localdev" ? "../../../assets/selphi" : "./selphi";

  const widgetRef = useRef<HTMLElement>();

  const widgetDimensions = {
    width: FPhiCameraResolutions.res720p.width,
    height: FPhiCameraResolutions.res720p.height,
  };

  function onExtractionFinish(extractionResult) {
    const resultDetail = extractionResult?.detail;
    const bestImage: string = resultDetail?.bestImage?.src;
    const bestImageB64 = bestImage?.split(",")[1];

    if (bestImageB64) {
      setBase64Image(bestImageB64);
      props.setImageTokenize &&
        props.setImageTokenize(resultDetail?.bestImageTokenized ?? "");
    }

    props.setIsCaptureStarted(false);
    stopCameraStream();
  }

  const stopCameraStream = () => {
    const stream = cameraStreamRef.current;
    if (!stream) return;

    stream.getTracks().forEach((track) => {
      track.stop();
      stream.removeTrack(track);
    });

    cameraStreamRef.current = null;
  };

  function onExceptionCaptured(exceptionResult) {

    switch (exceptionResult.detail.exceptionType) {
      case FPhi.Selphi.ExceptionType.CameraError:
        break;
      case FPhi.Selphi.ExceptionType.UnexpectedCaptureError:
        break;

    }

    props.setIsCaptureStarted(false);
  }

  useEffect(() => {
    if (!props.isCaptureStarted) return;

    const node = widgetRef.current;

    if (!node) return;
    node.addEventListener("onExtractionFinish", onExtractionFinish);
    node.addEventListener("onExceptionCaptured", onExceptionCaptured);

    return () => {
      node.removeEventListener("onExtractionFinish", onExtractionFinish);
      node.removeEventListener("onExceptionCaptured", onExceptionCaptured);
    };

  }, [props.isCaptureStarted]);

  if (!props.isCaptureStarted) return null;


  return (
    <div className={styles.widgetContainer}>
      <facephi-selphi
        ref={widgetRef}
        language="es"
        bundlePath={widgetBundlePath}
        cameraWidth={widgetDimensions.width}
        cameraHeight={widgetDimensions.height}
        cameraType={FPhi.Selphi.CameraType.Front}
        interactible={false}
        faceTracking
        imageFormat="image/jpeg"
        showLog={false}
      />
    </div>
  );
};
