export const getRandomEnumValue = <Enum extends Record<string, string>>(
  someEnum: Enum
): Enum[keyof Enum] => {
  const randomIndex = Math.floor(Math.random() * Object.keys(someEnum).length);
  return someEnum[Object.keys(someEnum)[randomIndex]] as Enum[keyof Enum];
};
