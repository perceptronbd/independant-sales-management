export const generateRefCode = (userId) => {
  const codePrefix = "REF";
  const codeSuffix = userId.slice(-6);
  const referralCode = `${codePrefix}-${codeSuffix}`;

  return referralCode;
};
