
def convert_result_order(result:str) -> int:
    # 最終結果の文字列からソート用の数値を算出する
    finals = [
        '第１位',
        '第２位',
        '第３位',
        '第４位',
        '第５位',
        '第６位',
        '第７位',
        '第８位',
        '第９位',
        '第１０位',
        '第１１位',
        '第１２位',
    ]
    if result in finals:
        return finals.index(result) + 1
    qualifying = [
        '準決勝',
        '準々決勝',
        '終予選',
        '９予選',
        '８予選',
        '７予選',
        '６予選',
        '５予選',
        '４予選',
        '３予選',
        '２予選',
        '１予選',
    ]
    if result in qualifying:
        return (qualifying.index(result) + 2) * 10

    return 999
