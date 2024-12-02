const num_strings =['０', '１', '２', '３', '４', '５', '６', '７', '８', '９', ]
export function BackNumberConvert(back_number: string) {
    const res_list:number[] = []
    back_number.split('').forEach((element) => {
        res_list.push(num_strings.indexOf(element))
    })
    return parseInt(res_list.join(''))
}