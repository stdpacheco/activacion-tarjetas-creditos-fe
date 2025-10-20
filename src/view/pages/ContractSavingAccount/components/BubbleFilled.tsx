import { Stack } from "@/components/Stack";
import IonIcon from "@reacticons/ionicons";
import { Edit, TrashCan } from "akar-icons";
import { FC, Fragment, memo } from "react";
interface IProps {
  fileds: { name: string; value: string }[];
  removable?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const BubbleFilled: FC<IProps> = memo((props) => {
  const isSingleField = props.fileds.length === 1;
  
  return (
    <div className="grid grid-cols-[1fr,auto] gap-[4rem]">
      <Stack direction="column" space={4}>
        {props.fileds.map((field, index) => (
          <Fragment key={index}>
            {field.value && field.value != "" ? (
              <div className="text-start break-all">
                <strong className="text-base text-start">{field.name}</strong>
                <p className="text-start text-base text-wrap">{field.value}</p>
              </div>
            ) : null}
          </Fragment>
        ))}
      </Stack>
      
      <div className={`flex ${isSingleField ? "items-center" : "items-start pt-1"} h-full`}>
        {props.editable ? (
          <Stack direction="row" align="center" space={16}>
        {props.onRemove && props.removable && (
          <TrashCan className="text-red-600" onClick={props.onRemove} />
        )}
        {props.onEdit && <Edit className="text-blue-600" onClick={props.onEdit} />}
          </Stack>
        ) : (
          <IonIcon name="checkmark-circle" className="text-success text-2xl" />
        )}
      </div>
    </div>
  );
});
