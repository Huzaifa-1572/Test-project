// import { BASE_URL, ENDPOINTS } from "src/Utils/Config";

const GENERIC_HANDLER = ({ CURRENT_SCREEN, data, kuid }) => {
  let fields;
  if (Array.isArray(kuid)) {
    fields = kuid.map((kuid) => ({
      kuid,
      userValue: data[kuid],
    }));
  } else {
    fields =
      CURRENT_SCREEN != "scr119_requiredDocuments"
        ? [
            {
              kuid: kuid,
              userValue: data[kuid],
            },
          ]
        : [];
  }

  if (CURRENT_SCREEN == "scr118.1_studentFundsource") {
    fields = [
      {
        kuid: "e__SourceofFunds",
        userValue: data["e__StudentSourceofFund"],
      },
    ];
  }

  if (CURRENT_SCREEN == "scr129_mailingAddress") {
    if (fields[3]?.userValue == "Same as Mailing") {
      fields.splice(-3);
    }
  }

  const ENCRYPTED_BODY = encryptText({
    token: localStorage.getItem("token"),
    screenKuid: CURRENT_SCREEN,
    fields,
  });

  const BODY = { payload: ENCRYPTED_BODY };

  return {
    API_URL: `${BASE_URL}${ENDPOINTS.GENERIC_HANDLER}`,
    BODY,
  };
};

const CNIC_HANDLER = ({ CURRENT_SCREEN, data }) => {
  const BODY = {
    token: localStorage.getItem("token"),
    screenKuid: CURRENT_SCREEN,
    fields: [
      {
        kuid: kuid,
        userValue: data[kuid],
      },
    ],
  };

  return {
    API_URL: ``,
    BODY,
  };
};

export const COFormSubmission = {
  scr_customerCnic: ({ CURRENT_SCREEN, data }) => {
    return CNIC_HANDLER({
      CURRENT_SCREEN,
      data,
    });
  },
};
