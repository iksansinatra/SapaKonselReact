import { library } from '@fortawesome/fontawesome-svg-core';

/* SOLID */
import {
  faHouse,
  faNewspaper,
  faFileLines,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

/* REGULAR */
import {
  faHouse as faHouseRegular,
  faNewspaper as faNewspaperRegular,
  faFileLines as faFileLinesRegular,
  faUser as faUserRegular,
} from '@fortawesome/free-regular-svg-icons';

import {
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  // solid
  faHouse,
  faNewspaper,
  faFileLines,
  faUser,

  // regular
  faHouseRegular,
  faNewspaperRegular,
  faFileLinesRegular,
  faUserRegular,

  // brands
  faWhatsapp,
);
