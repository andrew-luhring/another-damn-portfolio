/*
 ### jQuery XML to JSON Plugin v1.0 - 2008-07-01 ###
 * http://www.fyneworks.com/ - diego@fyneworks.com
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 ###
 Website: http://www.fyneworks.com/jquery/xml-to-json/
 *//*
 # INSPIRED BY: http://www.terracoder.com/
 AND: http://www.thomasfrank.se/xml_to_json.html
 *//*
 This simple script converts XML (document of code) into a JSON object. It is the combination of 2
 'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
 */
// Avoid collisions


define ([
    'jquery'
  ]
  , function ($) {

    var jsVar = function (s) {
        return String (s || '').replace (/-/g, "_"); }
      , makeArr = function (o) {
      if (!o.length) {
        o = [ o ];
      }
      o.length = o.length;
      // here is where you can attach additional functionality, such as searching and sorting...
      return o;
    }


    /**
     * parse xml
     * @param node
     * @param simple
     * @param extended
     * @returns {*}
     */
    function parseXML(node, simple, extended) {
      if (!node) {
        return null;
      }
      var txt = ''
        , obj = null
        , att = null
        , out
        , nodeType = node.nodeType
        , nodeName = jsVar (node.localName || node.nodeName);

      if (node.childNodes) {
        if (node.childNodes.length > 0) {

//          console.log(['x2j', nodeName, 'CHILDREN', node.childNodes]);

          $.each (node.childNodes, function (n, _contentNode_) {
            var content = {
                type: _contentNode_.nodeType
              , name : jsVar (_contentNode_.localName || _contentNode_.nodeName)
              , value : _contentNode_.text || _contentNode_.nodeValue || ''
            };

            // ignore comment node
            if (content.type === 8) { return; }

            // ignore white-space in between tags
            if (content.type === 3 || content.type === 4 || !content.name) {
              if (content.value.match (/^\s+$/)) {
                return;
              }
              txt += content.value.replace (/^\s+/, '').replace (/\s+$/, '');
            }

            // make sure we ditch trailing spaces from markup
            obj = obj || {};

            if (obj[content.name]) {

              if (!obj[content.name].length) {
                obj[content.name] = makeArr (obj[content.name]);
              }

              obj[content.name][ obj[content.name].length ] = parseXML (_contentNode_, true/* simple */);
              obj[content.name].length = obj[content.name].length;

            } else {
              obj[content.name] = parseXML (_contentNode_);
            }



          });
        }
        //node.childNodes.length>0
      }

      if (node.attributes) {
        if (node.attributes.length > 0) {
          att = {};
          obj = obj || {};

          $.each (node.attributes, function (a, at) {
            var atn = jsVar (at.name)
              , atv = at.value;

            att[atn] = atv;

            if (obj[atn]) {
              if (!obj[atn].length) {
                obj[atn] = makeArr (obj[atn]);
              }
              obj[atn][ obj[atn].length ] = atv;
              obj[atn].length = obj[atn].length;

            } else {
              obj[atn] = atv;
            }

          });
        }
      }

      if (obj) {
        obj = $.extend ((txt != '' ? new String (txt) : {}), /* {text:txt},*/ obj || {});
        txt = (obj.text) ? (typeof(obj.text) === 'object' ? obj.text : [obj.text || '']).concat ([txt]) : txt;
        if (txt) {
          obj.text = txt;
        }
        txt = '';
      }

      out = obj || txt;
      if (extended) {
        if (txt) {
          out = {};
        }
        txt = out.text || txt || '';
        if (txt) {
          out.text = txt;
        }
        if (!simple) {
          out = makeArr (out);
        }
      }

      return out;
    };
    /**
     * Convert text to XML DOM
     * @param str
     * @returns {HTMLDocument|*}
     */
    function text2xml(str) {
      var xml = new DOMParser ();
      xml.async = false;
      return xml.parseFromString (str, "text/xml");
    }
    /**
     * converts xml documents and xml text to json object
     * @param xml
     * @param extended
     * @returns {*}
     */
    function xml2json(xml, extended) {
      var out
        , root;
      if (      !xml             ) {    return {};    }
      if (typeof xml === 'string') {    xml = $.text2xml (xml);   }
      if (      !xml.nodeType    ) {    return;     }

      // Find xml root node
      root = (xml.nodeType === 9) ? xml.documentElement : xml;
      // Convert xml to json
      out = parseXML (root, true);
      if (xml.nodeType === 3 || xml.nodeType === 4) {
        return xml.nodeValue;
      }

      // Clean-up memory
      xml = null;
      root = null;

      // Send output
      return out;
    }


    return  $.extend ({
      text2xml : text2xml
      , xml2json: xml2json
    });
  });
