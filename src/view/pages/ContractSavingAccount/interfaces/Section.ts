export interface ISeptionProps {
  onComplete: <T = any>(conditional?: T) => void;
  initiateLoad?: boolean;
}
