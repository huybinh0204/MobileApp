export default class Version {
  mayor;
  minor;
  patch;

  /**
   * @param {string} version
   */
  constructor(version) {
    const [mayor, minor, patch] = version.split('.');

    this.mayor = Number(mayor);
    this.minor = Number(minor);
    this.patch = Number(patch);
  }

  /**
   * @param {Version} other
   */
  isGreaterThan(other) {
    if (other.mayor < this.mayor) return true;
    if (other.mayor > this.mayor) return false;

    if (other.minor < this.minor) return true;
    if (other.minor > this.minor) return false;

    if (other.patch < this.patch) return true;
    if (other.patch > this.patch) return false;

    return false;
  }
}
