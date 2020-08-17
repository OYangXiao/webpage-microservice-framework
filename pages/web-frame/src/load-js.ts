var cache = {} as any;
var head = document.getElementsByTagName('head')[0] || document.documentElement;

function exec(options: any) {
  if (typeof options === 'string') {
    options = {
      url: options,
    };
  }

  var cacheId = options.id || options.url;
  var cacheEntry = cache[cacheId];

  if (cacheEntry) {
    console.log('load-js: cache hit', cacheId);
    return cacheEntry;
  } else if (options.allowExternal !== false) {
    var el = getScriptById(options.id) || getScriptByUrl(options.url);

    if (el) {
      var promise = Promise.resolve(el);

      if (cacheId) {
        cache[cacheId] = promise;
      }

      return promise;
    }
  }

  if (!options.url && !options.text) {
    throw new Error('load-js: must provide a url or text to load');
  }

  var pending = (options.url ? loadScript : runScript)(head, createScript(options));

  if (cacheId && options.cache !== false) {
    cache[cacheId] = pending;
  }

  return pending;
}

function runScript(head: HTMLHeadElement, script: HTMLScriptElement) {
  head.appendChild(script);
  return Promise.resolve(script);
}

function loadScript(head: HTMLHeadElement, script: HTMLScriptElement) {
  return new Promise(function (resolve, reject) {
    // Handle Script loading
    var done = false;

    // Attach handlers for all browsers.
    //
    // References:
    // http://stackoverflow.com/questions/4845762/onload-handler-for-script-tag-in-internet-explorer
    // http://stevesouders.com/efws/script-onload.php
    // https://www.html5rocks.com/en/tutorials/speed/script-loading/
    //
    script.onload = function () {
      if (!done) {
        done = true;

        // Handle memory leak in IE
        script.onload = null;
        resolve(script);
      }
    };

    script.onerror = reject;

    head.appendChild(script);
  });
}

function createScript(options: any) {
  var script = document.createElement('script');
  script.charset = options.charset || 'utf-8';
  script.type = options.type || 'text/javascript';
  script.async = !!options.async;
  script.id = options.id || options.url;
  script.dataset.loadJS = 'watermark';

  if (options.url) {
    script.src = options.url;
  }

  if (options.text) {
    script.text = options.text;
  }

  return script;
}

function getScriptById(id: string) {
  var script = id && document.getElementById(id);

  if (script && script.dataset.loadJS !== 'watermark') {
    console.warn('load-js: duplicate script with id:', id);
    return script;
  }
}

function getScriptByUrl(url: string) {
  var script = url && (document.querySelector("script[src='" + url + "']") as HTMLScriptElement);

  if (script && script.dataset.loadJS !== 'watermark') {
    console.warn('load-js: duplicate script with url:', url);
    return script;
  }
}

export default function loadJs(items: any) {
  return items instanceof Array ? Promise.all(items.map(exec)) : exec(items);
}
