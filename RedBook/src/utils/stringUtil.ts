export const formatPhone = (phone: string):string => {
  let trim = phone.replace(/\s+/g,"");
  const result = [
    trim.slice(0,3),
    trim.slice(3,7),
    trim.slice(7,11)
  ].filter(item=>!!item).join(" ");
  return result;
}

export const replaceBlank = (phone:string):string => {
  return phone ? phone.replace(/\s+/g,"") : "";
}