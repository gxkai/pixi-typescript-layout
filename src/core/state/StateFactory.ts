import {
    SelectSuperState,
    NormalSelectState,
    EditingSelectState,
    NormalNoneState,
    EditingNoneState,
    EditingEraserState,
} from './State';
import { EditEnum, SelectEnum } from '../common/Graph';

export default function StateFactory(
    eEnum: EditEnum, sEnum: SelectEnum, enableEraser: boolean, index: Array<number>
): SelectSuperState {
    const ee = EditEnum;
    const se = SelectEnum;
    switch (true) {
        case ((eEnum === ee.Editing) && enableEraser):
            return new EditingEraserState(index, sEnum);
        case ((eEnum === ee.Editing) && (sEnum === se.None)):
            return new EditingNoneState(index, sEnum);
        case ((eEnum === ee.Editing) && (sEnum === se.Shape)):
        case ((eEnum === ee.Editing) && (sEnum === se.Line)):
        case ((eEnum === ee.Editing) && (sEnum === se.Point)):
            return new EditingSelectState(index, sEnum);
        case ((eEnum === ee.Normal) && enableEraser):
            return new NormalNoneState(index, sEnum);
        case ((eEnum === ee.Normal) && (sEnum === se.Shape)):
            return new NormalSelectState(index, sEnum);
        case ((eEnum === ee.Normal) && (sEnum === se.None)):
        default:
            return new NormalNoneState(index, sEnum);
    }
}
