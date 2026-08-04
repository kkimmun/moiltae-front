import { Button, Field, Input } from "../../styles/shared";
import {
  RangeEmpty,
  RangeList,
  RangeRow,
  RangeSeparator,
} from "./TimeRangeEditor.styles";

export default function TimeRangeEditor({
  ranges,
  startDate,
  endDate,
  disabled,
  onChange,
  onRemove,
}) {
  if (ranges.length === 0) {
    return (
      <RangeEmpty>
        {disabled
          ? "등록된 가능 시간 구간이 없습니다."
          : "가능한 시간 구간을 추가해 주세요."}
      </RangeEmpty>
    );
  }

  return (
    <RangeList>
      {ranges.map((range, index) => (
        <RangeRow key={range.id}>
          <Field>
            날짜
            <Input
              type="date"
              min={startDate}
              max={endDate}
              value={range.date}
              disabled={disabled}
              aria-label={`${index + 1}번째 가능 날짜`}
              onChange={(event) => onChange(range.id, "date", event.target.value)}
            />
          </Field>
          <Field>
            시작
            <Input
              type="time"
              step="1800"
              value={range.startTime}
              disabled={disabled}
              aria-label={`${index + 1}번째 시작 시간`}
              onChange={(event) => onChange(range.id, "startTime", event.target.value)}
            />
          </Field>
          <RangeSeparator>~</RangeSeparator>
          <Field>
            종료
            <Input
              type="time"
              step="1800"
              value={range.endTime}
              disabled={disabled}
              aria-label={`${index + 1}번째 종료 시간`}
              onChange={(event) => onChange(range.id, "endTime", event.target.value)}
            />
          </Field>
          {!disabled && (
            <Button
              type="button"
              $variant="danger"
              aria-label={`${index + 1}번째 시간 구간 삭제`}
              onClick={() => onRemove(range.id)}
            >
              삭제
            </Button>
          )}
        </RangeRow>
      ))}
    </RangeList>
  );
}
