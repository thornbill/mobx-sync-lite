/**
 * create non-enumerable field
 * @param p
 * @param key
 * @param desc
 */
export default function nonenumerable(
  p: any,
  key: string,
  desc?: PropertyDescriptor,
): any {
  desc = desc || Object.getOwnPropertyDescriptor(p, key);
  let pValue: any;
  if (desc) {
    desc.enumerable = false;
    const { get, set } = desc;
    pValue = desc.value;
    desc.set = function (value) {
      set && set.call(this, value);
      if (this === p) {
        pValue = value;
        return;
      }
      const instDesc = Object.getOwnPropertyDescriptor(this, key);
      if (instDesc) {
        instDesc.enumerable = false;
        Object.defineProperty(this, key, instDesc);
      } else {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: value,
        });
      }
    };
    desc.get = function () {
      return get ? get.call(this) : pValue;
    };
    return desc;
  }
  return {
    enumerable: false,
    configurable: true,
    set(value: any) {
      if (this === p) {
        pValue = value;
        return;
      }
      Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: value,
      });
    },
    get() {
      return pValue;
    },
  };
}
