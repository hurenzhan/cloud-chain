import { Array2D, StrNum } from "@/types/common"

enum TEST_TYPE {
    ONE = 10,
    TWO = 20
}

const TEST_DICT: Array2D = [
    [10, '测试1'],
    [20, '测试2'],
]

const dictMap = (dict: Array2D, index: StrNum) => {
    const getIndexValue: any = (type: any) => dict?.map(m => m[type])?.find(f => f === index)

    return {
        key: getIndexValue(0),
        value: getIndexValue(1),
    }
}

dictMap(TEST_DICT, 20)