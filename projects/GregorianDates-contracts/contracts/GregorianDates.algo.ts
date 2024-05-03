import { Contract } from '@algorandfoundation/tealscript';

interface GregorianDateObject {
  year: uint64;
  month: uint64;
  day: uint64;
}

export class GregorianDates extends Contract {

  toDate(ts: uint64): GregorianDateObject {
    // Number of days since 1970-01-01
    let z = ts / 86400
    // Shift the epoch from 1970-01-01 to 0000-03-01
    z += 719468
    let era = z / 146097
    let doe = z - era * 146097  // [0, 146096]
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365  // [0, 399]
    let y = yoe + era * 400
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100)  // [0, 365]
    let mp = (5 * doy + 2) / 153  // [0, 11]
    let d = doy - (153 * mp + 2) / 5 + 1  // [1, 31]
    let m = mp < 10 ? mp + 3 : mp - 9  // [1, 12]
    y = y + (m <= 2 ? 1 : 0)

    return {
      year: y,
      month: m,
      day: d
    }
  }
}
