import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() {
    }

    async checkLocalStorage():Promise<Object> {
        let data = {
          email: '',
          code: '',
          error: false
        };
        let code = btoa(btoa('codigo_empresa'));
        if(localStorage.getItem('email') != null) {
            data.email = await localStorage.getItem('email');
        } else {
            data.error = true;
        }
        if(localStorage.getItem(code) != null) {
            data.code = await localStorage.getItem(code);
        } else {
            data.error = true;
        }
        return data;
    }

    returnOnlyValues(data: object): object {
        let info = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value?.value) {
                if (value.hasOwnProperty("value")) {
                    if (typeof value.value == 'object') {
                        if (value.value?.year != null) {
                            if (value.value?.day < 10) value.value.day = '0' + value.value.day;
                            info[key] = value.value?.year + '-' + value.value?.month + '-' + value.value?.day;
                            value.value = value.value?.year + '-' + value.value?.month + '-' + value.value?.day;
                        }
                        (value.value instanceof Date) ? info[key] = this.convertDate(value.value) : info[key] = value.value;
                    } else {
                        info[key] = value.value;
                    }
                } else {
                    info[key] = value.selected.value;
                }
            } else if (value?.selected) {
                if (value.selected.length > 0) {
                    let joined = value.selected.map((d) => {
                        return d.value;
                    });
                    info[key] = joined.join(",");
                } else {
                    info[key] = value.selected.value;
                }
            } else if (value.length > 0) {
                let joined = value.map((d) => {
                    return d.value;
                });
                info[key] = joined.join(",");
            }
        });
        return info;
    }

    convertDate(fecha: any) {
        if (parseInt(fecha.month, 10) < 10) {
            fecha.month = '0' + Number(fecha.month);
        }
        if (parseInt(fecha.day, 10) < 10) {
            fecha.day = '0' + Number(fecha.day);
        }
        let dates = fecha.year + '-' + fecha.month + '-' + fecha.day;
        return dates;
    }

    validateAll(data: object) {
        Object.entries(data).forEach(([key, value]) => {
            if (value.validation == 'required') {
                value.error = !this.emptyValue(value.value);
            }
            if (value.validation == 'email') {
                value.error = !this.validateEmail(value.value);
            }
            if (value.validation == 'exactsize') {
                value.error = !this.exactSize(value.value.toString(), value.factor);
            }
            if (value.validation == 'min') {
                value.error = !(Number(value.value) >= Number(value.factor));
            }
            if (value.validation == 'max') {
                value.error = !(Number(value.value) >= 0 && Number(value.value) <= Number(value.factor));
            }
            if (value.validation == 'number') {
                value.error = !this.isNumeric(value.value);
            }
            if (value.validation == null) {
                value.error = false;
            }
        });
    }

    exactSize(value: String, size: number): boolean {
        return (value.length == size);
    }

    verifyErrorInput(data: object): boolean {
        let error = false;
        Object.entries(data).forEach(([key, value]) => {
            if (value.error == true) {
                error = true;
                return;
            }
        });
        return error;
    }

    validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emptyValue(value) {
        if (value == 0) return true;
        return !!(value);
    }

    existsObj(value, obj) {
        for (let k in obj) {
            if (obj[k].label === value) {
                return k;
            }
        }
        return -1;
    }

    exists(value, obj) {
        for (let k in obj) {
            if (k === value) {
                return true;
            }
        }
        return false;
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    formatDateBolivia(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
}
