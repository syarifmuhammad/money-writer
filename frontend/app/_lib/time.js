import moment from 'moment';
import 'moment/locale/id';

export function id(date) {
    moment.locale('id');
    return moment(date);
}

