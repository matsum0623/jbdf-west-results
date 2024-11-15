import os
import sys
from pypdf import PdfReader
import urllib.request
import urllib.error
import requests
from bs4 import BeautifulSoup

url_base = f'http://jbdf-west.jp/compe/data/'

import boto3
from boto3.dynamodb.conditions import Key, Attr
session = boto3.Session(profile_name='sam-cli')
dynamodb_resource = session.resource('dynamodb')
table = dynamodb_resource.Table('jbdf-west-results')

results = {
    '同３位',
    '同４位',
    '同５位',
    '同６位',
    '欠　場',
    '準決勝',
    '準々決',
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
    '終予選',
    '１予選',
    '２予選',
    '３予選',
}

sections_pdf = [
    'POB',
    'PAB',
    'PBB',
    'PCB',
    'PDB',
    'PEB',
    'PFB',

    'POL',
    'PAL',
    'PBL',
    'PCL',
    'PDL',
    'PEL',
    'PFL',

    'AOB',
    'AAB',
    'ABB',
    'ACB',
    'ADW',
    'ADT',
    'ADF',
    'ADQ',
    'ADV',
    'AEW',
    'AET',
    'AEF',
    'AEQ',
    'AEV',
    'AFW',
    'AFT',
    'AFF',
    'AFQ',
    'AFV',

    'AOL',
    'AAL',
    'ABL',
    'ACL',
    'ADC',
    'ADS',
    'ADR',
    'ADP',
    'ADJ',
    'AEC',
    'AES',
    'AER',
    'AEP',
    'AEJ',
    'AFC',
    'AFS',
    'AFR',
    'AFP',
    'AFJ',
]

sections_html = [
    'RTPRM01A-SO.html',
    'RTPRM02A-SA.html',
    'RTPRM04A-SB.html',
    'RTPRM06A-SC.html',
    'RTPRM08A-SD.html',
    'RTPRM10A-SE.html',
    'RTPRL01A-LO.html',
    'RTPRL02A-LA.html',
    'RTPRL04A-LB.html',
    'RTPRL06A-LC.html',
    'RTPRL08A-LD.html',
    'RTPRL09A-LDE.html',
    'RTPRL09A-LE.html',
    'RTAMM11A-SO.html',
    'RTAMM12A-SA.html',
    'RTAMM14A-SB.html',
    'RTAMM16A-SC.html',
    'RTAMM18A-SDW.html',
    'RTAMM19A-SDT.html',
    'RTAMM20A-SDF.html',
    'RTAMM21A-SDQ.html',
    'RTAMM51A-SEW.html',
    'RTAMM52A-SET.html',
    'RTAMM53A-SEF.html',
    'RTAMM41A-SEW.html',
    'RTAMM19A-SDT.html',
    'RTAMM44A-SEQ.html',
    'RTAMM61A-SFW.html',
    'RTAMM62A-SFT.html',
    'RTAML11A-LO.html',
    'RTAML12A-LA.html',
    'RTAML14A-LB.html',
    'RTAML16A-LC.html',
    'RTAML23A-LDC.html',
    'RTAML24A-LDS.html',
    'RTAML25A-LDR.html',
    'RTAML46A-LEC.html',
    'RTAML47A-LES.html',
    'RTAML48A-LER.html',
]

def read_html(url):
    html = requests.get(url)
    if html.status_code != 200:
        return []
    soup = BeautifulSoup(html.content.decode("cp932", "ignore"), "html.parser")

    res_data = []
    for line in soup.find('pre').text.split('\n'):
        if line:
            res_data.append(line)
    return res_data

def read_pdf(dst_path):
    reader = PdfReader(dst_path)
    all_data = []
    for page in reader.pages:
        text = page.extract_text()
        all_data += text.split("\n")
    return all_data

def read_data(all_data):

    line_count = 0
    event_info = {}
    section = ''
    result_data = []
    errors = []
    for d in all_data:
        line_count += 1
        data = d.strip().split(' ')
        if line_count == 1:
            if len(data) == 3:
                try:
                    prog = data[1].split('　')[1]
                except Exception as e:
                    print(data[1].split('　'))
                    print(all_data)
                    raise e
            else:
                prog = data[2]
            event_info['basics'] = prog.startswith('(')
            prog = prog.replace('(', '').replace(')', '')
            event_info['program'] = prog
            continue

        if d.startswith('タイトル'):
            event_info['title'] = data[-1]
            continue
        elif d.startswith('会    場'):
            event_info['place'] = data[-1]
        elif d.startswith('部    門'):
            div_list = d.replace('部    門', '').strip().split(' ')
            pro_ama = div_list[-1].split('　')
            event_info['division_pro_ama'] = pro_ama[0]
            event_info['division'] = pro_ama[1]
            event_info['class'] = div_list[0].split('　')[0]
        elif d.startswith('日    付'):
            event_info['date'] = data[-1]
        elif d.startswith('*******'):
            # セクション判定
            section = data[2]
            continue

        if section != '最終結果':
            continue

        if data[0] == '背番号':
            continue

        try:
            fix_data = []
            for i in data:
                if i != '':
                    fix_data.append(i)
            if not fix_data:
                continue
            back_number = fix_data[0]
            id = fix_data[1]
            couple_rank = fix_data[2]
            leader = fix_data[3]
            partner = fix_data[4]
            if len(fix_data) == 6:
                result = fix_data[5]
            elif len(fix_data) >= 7:
                result = fix_data[6]
                result_ranking = []
                if result not in results and ((len(fix_data) == 8 and len(prog) > 1) or (len(fix_data) == 8 + len(prog))):
                    result += fix_data[7]
                elif len(fix_data) >= 8 and fix_data[7] not in ['（棄権）','(ベーシック規定違反）']:
                    try:
                        float(fix_data[7])
                    except:
                        result += fix_data[7]

            if result not in results:
                if event_info['date'] in (
                    '2022/04/17',
                    '2022/05/01',
                    '2022/05/05',
                    ):
                    if fix_data[-1] in results:
                        result = fix_data[-1]
                        if len(fix_data) == 8:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5]
                        elif len(fix_data) == 9:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5] + '　' + fix_data[6]
                    else :
                        for i in range(1,7):
                            try:
                                float(fix_data[-1 * i])
                            except:
                                result = fix_data[-1 * i]
                                if len(fix_data) - i + 1 == 8:
                                    leader = fix_data[3] + '　' + fix_data[4]
                                    partner = fix_data[5]
                                elif len(fix_data) - i + 1  == 9:
                                    leader = fix_data[3] + '　' + fix_data[4]
                                    partner = fix_data[5] + '　' + fix_data[6]
                                break
                elif event_info['date'] in (
                    '2023/05/05',
                    '2023/05/21',
                    '2023/07/02',
                    '2023/08/27',
                    '2023/09/10',
                    ):
                    if fix_data[-1] in results:
                        result = fix_data[-1]
                        if len(fix_data) == 8:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5]
                        elif len(fix_data) == 9:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5] + '　' + fix_data[6]
                    elif (fix_data[-2] + fix_data[-1]) in results:
                        result = fix_data[-2] + fix_data[-1]
                        if len(fix_data) == 9:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5]
                        elif len(fix_data) == 10:
                            leader = fix_data[3] + '　' + fix_data[4]
                            partner = fix_data[5] + '　' + fix_data[6]
                        else:
                            print(len(fix_data),fix_data,leader,partner)
                    else :
                        for i in range(1,7):
                            try:
                                float(fix_data[-1 * i])
                            except:
                                if fix_data[-1 * i] in results:
                                    result = fix_data[-1 * i]
                                    if len(fix_data) - i + 1 == 8:
                                        leader = fix_data[3] + '　' + fix_data[4]
                                        partner = fix_data[5]
                                    elif len(fix_data) - i + 1  == 9:
                                        leader = fix_data[3] + '　' + fix_data[4]
                                        partner = fix_data[5] + '　' + fix_data[6]
                                    break
                                elif fix_data[-1 * i - 1] + fix_data[-1 * i] in results:
                                    result = fix_data[-1 * i - 1] + fix_data[-1 * i]
                                    if len(fix_data) - i + 1 == 9:
                                        leader = fix_data[3] + '　' + fix_data[4]
                                        partner = fix_data[5]
                                    elif len(fix_data) - i + 1  == 10:
                                        leader = fix_data[3] + '　' + fix_data[4]
                                        partner = fix_data[5] + '　' + fix_data[6]
                                    break


            if result not in results:

                errors.append([event_info['date'], event_info['class'], event_info['division'], event_info['program'], result] + fix_data)
            else:
                result_data.append([
                    id, leader, partner, couple_rank, back_number, result[:3], result_ranking
                ])
        except Exception as e:
            errors.append([event_info['date'], event_info['class'], event_info['division'], event_info['program'], ''] + fix_data)

        line_count += 1
    return(event_info, result_data, errors)

def download_file(url, dst_path):
    try:
        with urllib.request.urlopen(url) as web_file:
            with open(dst_path, 'wb') as local_file:
                local_file.write(web_file.read())
        return True
    except urllib.error.HTTPError:
        return False

def output_csv(event_info, result_data, url):
    with open('./data/result.csv', mode='a') as f:
        for d in result_data:
            f.write(','.join([
                event_info['date'],
                event_info['title'],
                event_info['division_pro_ama'],
                event_info['division'],
                event_info['class'],
                event_info['program'],
            ] + d[:6] + [url]) + '\n')

def output_errors(errors):
    with open('./data/errors.csv', mode='a') as f:
        for d in errors:
            f.write(','.join(d) + '\n')

def init_result_csv():
    with open('./data/result.csv', mode='w') as f:
        f.write('date,title,pro_ama,division,class,program,id,leader,partner,rank,back_number,result,url\n')

    with open('./data/errors.csv', mode='w') as f:
        f.write('')

def create_url(dt, section, url_suffix):
    return url_base + f'{dt}/result/{section}' + url_suffix

def get_all_data(url, dt, section):
    print(url)
    if dt[:4] in ['2023', '2024'] or dt >= '20220625':
        dir_path = f'./data/pdf/{dt}'
        os.makedirs(dir_path, exist_ok=True)
        pdf_path = dir_path + f'/{section}.pdf'
        if not download_file(url, pdf_path):
            return False
        return read_pdf(pdf_path)
    elif dt[:4] in ['2021','2022']:
        return read_html(url)
    return False

def convert_class(division_pro_ama, class_str, division):
    res = ''
    if division_pro_ama == 'プロ':
        res += 'P'
    elif division_pro_ama == 'アマ':
        res += 'A'
    else:
        print('division_pro_ama', division_pro_ama)

    if division == 'ボールルーム' or division == 'スタンダード':
        res += 'B'
    elif division == 'ラテン' or division == 'ラテンアメリカン':
        res += 'L'
    else:
        print('division', division)


    if class_str == 'オープン':
        res += 'O'
    elif class_str == 'Ａ級':
        res += 'A'
    elif class_str == 'Ｂ級':
        res += 'B'
    elif class_str == 'Ｃ級':
        res += 'C'
    elif class_str == 'Ｄ級':
        res += 'D'
    elif class_str == 'Ｅ級':
        res += 'E'
    elif class_str == 'Ｆ級':
        res += 'F'
    elif class_str == 'ＤＥ混級':
        res += 'DE'
    elif class_str == 'ＥＦ混級':
        res += 'EF'
    else:
        res += 'Z'
        print('class_str', class_str)


    return res

def batch_write(info, player):
    # DynamoDBに登録する
    print('start batch write')
    with table.batch_writer(overwrite_by_pkeys=['PK', 'SK']) as bw:
        info_ct = 0
        for dt, values in info.items():
            if info_ct % 100 == 0:
                print(info_ct)
            bw.put_item(
                Item={
                    'PK': 'METADATA#COMPETITION',
                    'SK': 'DATE#' + dt.replace('/', ''),
                    'Name': values['Name'],
                    'Place': values['Place'],
                    'Classes': list(values['Results'].keys()),
                }
            )
            for class_id, class_data in values['Results'].items():
                bw.put_item(
                    Item={
                        'PK': 'RESULTS#' + dt.replace('/', ''),
                        'SK': 'CLASS#' + class_id,
                        'Program': class_data['Program'],
                        'Url': class_data['Url'],
                        'Results': class_data['Results'],
                    }
                )
            info_ct += 1
        print(info_ct)
        player_ct = 0
        for player_id, player_data in player.items():
            if player_ct % 100 == 0:
                print(player_ct)
            # 試合結果の登録
            res = table.query(
                KeyConditionExpression=Key('PK').eq('METADATA#COUPLE') & Key('SK').eq(f'RESULTS#{player_id}')
            )
            if len(res['Items']) > 0:
                over_write_item = res['Items'][0]['Results']
                for dt, data in player_data.items():
                    over_write_item[dt] = data
                # over_write_itemの最後の日付のcouple名を取得する
                last_competition = sorted(over_write_item.items(), key= lambda x: x[0])[-1]
                bw.put_item(
                    Item={
                        'PK': 'METADATA#COUPLE',
                        'SK': f'RESULTS#{player_id}',
                        'Results': over_write_item,
                    }
                )
            else:
                bw.put_item(
                    Item={
                        'PK': 'METADATA#COUPLE',
                        'SK': f'RESULTS#{player_id}',
                        'Results': player_data,
                    }
                )
            # カップル情報の登録
            competition_data = list(player_data.values())[0]
            bw.put_item(
                Item={
                    'PK': 'METADATA#COUPLE',
                    'SK': f'COUPLE#{player_id}',
                    'Leader': competition_data.get('Leader', ''),
                    'Partner': competition_data.get('Partner', ''),
                }
            )
            player_ct += 1
        print(info_ct)

def main():
    init_result_csv()


    with open('./data/dates/dates.csv') as f:
        for dt in f.readlines():
            info = {}
            player = {}
            dt = dt.replace('\n','')

            url_suffix, sections = ('.pdf', sections_pdf) if dt[:4] in ['2023', '2024'] or dt >= '20220625' else ('', sections_html)

            for section in sections:
                url = create_url(dt, section, url_suffix)
                all_data = get_all_data(url, dt, section)


                if not all_data:
                    continue

                event_info, result_data, errors = read_data(all_data)

                if errors:
                    output_errors(errors)
                output_csv(event_info, result_data, url.replace('\n', ''))

                try:
                    # 結果をサマリーする
                    info.setdefault(event_info['date'], {
                        'Name': event_info['title'],
                        'Place': event_info['place'],
                        'Results': {}
                    })
                    class_id = convert_class(event_info['division_pro_ama'], event_info['class'], event_info['division'])
                    info[event_info['date']]['Results'][class_id] = {
                        'Program': event_info['program'],
                        'Url': url.replace('\n', ''),
                        'Results': {item[0]: {
                            'Leader': item[1],
                            'Partner': item[2],
                            'Rank': item[3],
                            'BackNumber': item[4],
                            'Result': item[5],
                        }  for item in result_data}
                    }
                    for item in result_data:
                        player.setdefault(item[0], {})
                        player[item[0]][event_info['date'].replace('/', '') + '#' + class_id] = {
                            'CompetitionName': event_info['title'],
                            'CompetitionPlace': event_info['place'],
                            'Leader': item[1],
                            'Partner': item[2],
                            'Class': class_id,
                            'Rank': item[3],
                            'BackNumber': item[4],
                            'Result': item[5],
                        }
                except Exception as e:
                    print(event_info)
                    print(result_data)

            # DynamoDBに登録する
            batch_write(info, player)


if __name__ == "__main__":
    main()
