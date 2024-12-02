
type results_data = {
    date: string;
    name: string;
    place: string;
    classes: string[];
}

type couple_result = {
    couple_id: string;
    leader_name: string;
    partner_name: string;
    back_number: string;
    rank: string;
    result: string;
    result_order: number;
}

type couple_info = {
    couple_id: string;
    leader_name: string;
    partner_name: string;
}

type couple_results = {
    date: string;
    competition_name: string;
    class_id: string;
    rank: string;
    back_number: string;
    result: string;
    result_order: number;
}

type ClassNames = {
    [key: string]: string;
};
