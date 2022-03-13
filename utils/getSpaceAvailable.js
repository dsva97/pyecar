/**
 *
 * @param {*} element HTMLElement
 */
export const getSpaceAvailable = (element) => {
  const coords = element.getBoundingClientRect();
  const height = window.innerHeight - coords.top;
  const width = coords.width;
  return { height, width };
};
