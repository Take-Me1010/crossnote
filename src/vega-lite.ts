/**
 * Convert vega-lite to vega first, then render to svg.
 */
import * as YAML from 'yaml';
import * as utility from './utility';
import * as vega from './vega';
import * as vegaLite from 'vega-lite';

let vl = null;

export async function toSvg(spec: string = '', baseURL: string = '') {
  if (!vl) {
    vl = utility.loadDependency('vega-lite/vega-lite.min.js');
  }

  spec = spec.trim();
  let d;
  if (spec[0] !== '{') {
    d = YAML.parse(spec);
  } else {
    // json
    d = JSON.parse(spec);
  }

  return utility.allowUnsafeEval(() => {
    return utility.allowUnsafeNewFunction(() => {
      return vega.toSvg(JSON.stringify(vegaLite.compile(d).spec), baseURL);
    });
  });
}
