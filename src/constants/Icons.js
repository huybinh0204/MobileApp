import iconList from '_components/atoms/IconSvg/iconList';

/**
 * the icons list is the same declare when you import the svg elements on _components/atoms/IconSvg/iconList.
 */
const returnIconList = () => {
  let list = {};

  const listKeys = Object.keys(iconList);

  for (const key of listKeys) list[key] = key;

  return list;
};

export default returnIconList();
