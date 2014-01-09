Security = (function(global) {
	var CONST_SALT = 5381;
	var CONST_MD5_KEY = 'tencentQQVIP123443safde&!%^%1282';
	var hexcase = 0;
	var b64pad = '';
	var chrsz = 8;
	var mode = 32;
	function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	};
	function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	};
	function str_md5(s) {
		return binl2str(core_md5(str2binl(s), s.length * chrsz));
	};
	function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	};
	function b64_hmac_md5(key, data) {
		return binl2b64(core_hmac_md5(key, data));
	};
	function str_hmac_md5(key, data) {
		return binl2str(core_hmac_md5(key, data));
	};
	function core_md5(x, len) {
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		for (var i = 0; i < x.length; i += 16) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
			d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
			b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
			d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
			c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
			d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
			d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
			a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
			d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
			c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
			b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
			d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
			c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
			d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
			c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
			a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
			d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
			c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
			b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
			d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
			b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
			d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
			c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
			d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
			a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
			d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
			b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
			d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
			c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
			d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
			d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
			a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
			d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
			b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		if (mode == 16) {
			return Array(b, c);
		} else {
			return Array(a, b, c, d);
		}
	};
	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	};
	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	};
	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	};
	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	};
	function md5_ii(a, b, c, d, x, s, t) {
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	};
	function core_hmac_md5(key, data) {
		var bkey = str2binl(key);
		if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
		var ipad = Array(16),
		opad = Array(16);
		for (var i = 0; i < 16; i++) {
			ipad[i] = bkey[i] ^ 0x36363636;
			opad[i] = bkey[i] ^ 0x5C5C5C5C;
		}
		var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
		return core_md5(opad.concat(hash), 512 + 128);
	};
	function safe_add(x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	};
	function bit_rol(num, cnt) {
		return (num << cnt) | (num >>> (32 - cnt));
	};
	function str2binl(str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
		return bin;
	};
	function binl2str(bin) {
		var str = "";
		var mask = (1 << chrsz) - 1;
		for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
		return str;
	};
	function binl2hex(binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
		}
		return str;
	};
	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	};
	function _md5(s) {
		return hex_md5(s);
	};
	function _getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = ($.trim ? $.trim(cookies[i]) : jQuery.trim(cookies[i]));
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	};
	function _getAntiCSRFToken(objConfig) {
		objConfig = objConfig || {};
		var salt = objConfig.salt || CONST_SALT;
		var skey = objConfig.skey || _getCookie("skey") || {};
		var md5key = objConfig.md5key || CONST_MD5_KEY;
		var hash = [],
		ASCIICode;
		hash.push((salt << 5));
		for (var i = 0,
		len = skey.length; i < len; ++i) {
			ASCIICode = skey.charAt(i).charCodeAt();
			hash.push((salt << 5) + ASCIICode);
			salt = ASCIICode;
		}
		var md5str = _md5(hash.join('') + md5key);
		return md5str;
	};
	return {
		getAntiCSRFToken: _getAntiCSRFToken,
		md5: _md5
	};
})(window);
var save_to_weiyun = function(share_pwd) {
	QQDISK_MOBILE_OUTLINK.initShareToWeiyun(shareInfo, share_pwd);
};
var download_multi_file = function(code) {
	QQDISK_MOBILE_OUTLINK.initDownload(shareInfo, code);
};
var get_param = function(name) {
	var LocString = document.URL.substring(document.URL.indexOf('?') + 1);
	var rs = new RegExp("(^|)" + name + "=([^\&]*)(\&|$)", "gi").exec(LocString),
	tmp;
	if (tmp = rs) {
		return tmp[2];
	}
	return "";
}
var outlink_os_type = 30111;
QQDISK_MOBILE_OUTLINK = (function() {
	var _uin = 0;
	var _dst_uin = 0;
	var _timerLoading = null;
	var _pitch_share_info = {};
	var _batch_download_files = {};
	var _obj2str = function(o) {
		var r = [];
		if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
		if (typeof o == "object") {
			if (!o.sort) {
				for (var i in o) {
					r.push("\"" + i + "\":" + _obj2str(o[i]));
				}
				if ( !! document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
					r.push("toString:" + o.toString.toString());
				}
				r = "{" + r.join() + "}";
			} else {
				for (var i = 0; i < o.length; i++) {
					r.push(_obj2str(o[i]));
				}
				r = "[" + r.join(',') + "]";
			}
			return r;
		}
		return o.toString();
	};
	var _any = function(arr, filter) {
		if (arr) {
			for (var i = 0,
			l = arr.length; i < l; i++) {
				var it = arr[i];
				if (true === filter.call(it, it, i)) {
					return true;
				}
			}
		}
		return false;
	};
	var _getOSname = function() {
		var nav = navigator.userAgent.toLowerCase(),
		mappings = [['ipad', 'ipad'], ['iphone', 'iphone'], ['mac', 'mac os,macintosh'], ['windows_phone', 'windows phone'], ['windows', 'windows'], ['android', 'android'], ['linux', 'linux'], ['unix', 'unix'], ['symbian', 'symbian'], ['blackberry', 'bb10,blackberry,playbook']];
		for (var i = 0,
		l = mappings.length; i < l; i++) {
			var map = mappings[i],
			os_name = map[0],
			uas = map[1].split(',');
			if (_any(uas,
			function(ua) {
				return nav.indexOf(ua) !== -1;
			})) {
				return os_name;
			}
		}
		return 'unknown';
	};
	var _getBSname = function() {
		var b = $.browser;
		if (b.msie) {
			return 'ie' + parseInt($.browser.version);
		} else if (b.chrome) {
			return 'chrome';
		} else if (b.mozilla) {
			return 'mozilla';
		} else if (b.safari) {
			if (_getOSname() == 'android') return 'webkit';
			return 'safari';
		} else if (b.webkit) {
			return 'webkit';
		} else {
			return 'unknown';
		}
	};
	var _queryXhr2 = function(cmd, data, uin, url, callback) {
		var _domain = "weiyun.com";
		try {
			document.domain = _domain;
		} catch(e) {};
		var _version = 0;
		var _mainVer = _version == 0 ? 12 : (_version == 1 ? 11 : 13);
		var _token = Security.getAntiCSRFToken();
		var _param = {
			"req_header": {
				"proto_ver": 10006,
				"main_v": _mainVer,
				"sub_v": 1,
				"encrypt": 0,
				"msg_seq": 1,
				"source": window['outlink_os_type'],
				"appid": window['outlink_os_type'],
				"token": _token,
				"client_ip": '127.0.0.1',
				"cmd": cmd,
				"uin": uin
			},
			"req_body": data
		};
		_param = _obj2str(_param);
		$.ajax({
			url: url + (url.indexOf('?') > -1 ? '&cmd=': '?cmd=') + cmd,
			data: {
				data: _param
			},
			dataType: 'jsonp',
			timeout: 3000,
			success: function(res) {
				callback(res);
			}
		});
	};
	var xhr2 = function(url, callback, data) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function(e) {
			try {
				var data = window.JSON.parse(xhr.responseText);
				callback(data);
			} catch(e) {}
		};
		xhr.withCredentials = true;
		xhr.open("POST", url, true);
		xhr.send(data);
	};
	var _outlinkLogCommit = function(_param) {
		try {
			document.domain = "weiyun.com";
		} catch(e) {};
		var _url = 'http://tj.cgi.weiyun.com/wy_log.fcg';
		_param = _obj2str(_param);
		var t = new Image();
		t.onload = t.onerror = t.onabort = function() {
			this.onload = this.onerror = this.onabort = null;
			delete t;
		};
		t.src = _url + '?data=' + encodeURIComponent(_param);
	};
	var _outlinklog = function(op_id) {
		var _data = {
			"req_header": {
				"uin": 0,
				"cmd": "wy_log_71",
				"source": "weiyunWeb"
			},
			"req_body": {
				"os_type": 30013,
				"items": [{
					"act_id": 106,
					"op_id": op_id
				}]
			}
		}
		_outlinkLogCommit(_data);
	};
	var _initDownload = function(decodeInfo, verify_code) {
		var _url = 'http://web.cgi.weiyun.com/share_dl.fcg';
		var _dirs = [],
		_files = [];
		var _dirs = [],
		_files = [];
		for (var i = 0; i < decodeInfo.dir_list.length; i++) {
			_dirs.push(decodeInfo.dir_list[i].dir_key);
		}
		for (var i = 0; i < decodeInfo.file_list.length; i++) {
			_files.push(decodeInfo.file_list[i].file_id);
		}
		var _url_param = {
			sharekey: decodeInfo.sharekey,
			fid: _files.join(','),
			dir: _dirs.join(','),
			zn: (decodeInfo.sharename),
			pdir: decodeInfo.pdir_key,
			uin: decodeInfo.uin,
			skey: _getCookie("skey"),
			os_info: encodeURIComponent(_getOSname()),
			browser: encodeURIComponent(_getBSname()),
			ver: 12
		};
		var pwd = get_param('pwd');
		_url_param.err_callback = 'http://share.weiyun.com/web/iframe_share_down_fail.html?sharekey=' + decodeInfo.sharekey + '&pwd=' + pwd;
		if (verify_code) {
			_url_param.authcode = verify_code;
		}
		$form = $('<form method="GET" enctype="application/x-www-form-urlencoded"></form>').appendTo(document.body);
		$form.empty().attr('action', _url).attr('target', '_self').attr('method', 'POST');
		$.each(_url_param,
		function(name, value) {
			$('<input type="hidden" name="' + name + '" />').val(value).appendTo($form);
		});
		$form[0].submit();
		_outlinklog(1);
	};
	var _getCookie = function(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = $.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	};
	var _pitchStore = function(share_pwd) {
		if (_getCookie('uin')) {
			var uin = _getCookie('uin').replace(/^[oO0]*/, '');
			uin = uin - 0;
		} else {
			var uin = 0;
		}
		var sid = _getQStr("sid"),
		url = 'http://web2.cgi.weiyun.com/wy_share_v2.fcg';
		if (sid !== '') {
			url += '?sid=' + sid;
		}
		var _xhr = _queryXhr2("dump_share", _pitch_share_info, uin, url,
		function(_obj) {
			if (_obj.rsp_header) {
				if (_obj.rsp_header["ret"] == 102010 || _obj.rsp_header["ret"] == 1024 || _obj.rsp_header["ret"] == 190051 || _obj.rsp_header["ret"] == 190041) {
					var sharekey = _pitch_share_info.share_key;
					var go_url = 'http://share.weiyun.com/' + sharekey + '?as=1';
					if (share_pwd != null && share_pwd != '') {
						go_url += '%26pwd=' + share_pwd;
					}
					window.location.href = "http://pt.3g.qq.com/s?aid=touchLogin&t=weiyuntouch&bid_code=weiyun&go_url=" + go_url;
				} else {
					_showSaving();
					setTimeout(function() {
						_showsuc(_obj.rsp_header, _obj.rsp_body ? _obj.rsp_body: {});
					},
					2000);
				}
			} else {
				_showsuc( - 1, {});
				_outlinklog(_obj.rsp_header.ret);
			}
		});
	};
	var _get_info_sharekey = function(share_para) {
		var share_key = share_para.split('&&')[0];
		var share_fun = share_para.split('&&')[1];
		var mobile_type = share_para.split('&&')[2];
		var pwd = share_para.split('&&')[3] || '';
		var data = {
			"share_key": share_key,
			"share_pwd": pwd
		};
		_queryXhr2("view_share", data, 0, "http://web2.cgi.weiyun.com/wy_share_v2.fcg",
		function(_obj) {
			var ret = _obj.rsp_header.ret;
			var filename = _obj.rsp_body.file_list[0].file_name;
			shareInfo = {
				"ret": ret,
				"sharekey": share_key,
				"filename": filename
			};
			$.extend(shareInfo, _obj.rsp_body);
			risk_ui_init(shareInfo, share_fun, mobile_type);
			_init(shareInfo);
		});
	}
	var risk_ui_init = function(shareInfo, jumpurl, mobile_type) {
		var file_suffix = shareInfo.filename.substr(shareInfo.filename.lastIndexOf('.') + 1);
		var risk_level = '';
		switch (shareInfo.safetype) {
		case 1:
			risk_level = '安全';
			break;
		case 2:
			risk_level = '高';
			break;
		case 3:
			risk_level = '中';
			break;
		case 4:
			risk_level = '低';
			break;
		default:
			risk_level = '';
		}
		$('#risk_level').text(risk_level);
		$('#virus').text(shareInfo.virusname);
		$('#file_type').attr('src', 'http://imgcache.qq.com/vipstyle/nr/box/icon/' + file_suffix + '.png');
		$('#virus_detail').text(shareInfo.virusdesc);
		$('#file_name').text(format_file_name(shareInfo.filename));
		$('#file_name').attr('title', format_file_name(shareInfo.filename)) $('#save_to_wy').attr('href', jumpurl);
		if (mobile_type === '1') {
			$('#down_mobile_master').attr('href', 'http://m.qq.com?g_f=23459');
		} else {
			$('#down_mobile_master').attr('href', 'http://m.qq.com?g_f=23458');
		}
	}
	var format_file_name = function(file_name) {
		var max_pre_length = 4,
		max_suffix_length = 6,
		file_name_pre, file_name_suffix;
		if (file_name.length > max_pre_length + max_suffix_length) {
			file_name_pre = file_name.substr(0, max_pre_length);
			file_name_suffix = file_name.substr(file_name.length - max_suffix_length);
			var format_name = file_name_pre + '...' + file_name_suffix;
			return format_name;
		}
		return file_name;
	}
	var _showsuc = function(rsp_head, rsp_body) {
		clearInterval(_timerLoading);
		if (rsp_head["ret"] == 0 || rsp_head["ret"] == 1051) {
			_showSavedSuc();
		} else {
			var arr = {
				"1013": '网络问题，请稍后重试。',
				"1024": '网络问题，请稍后重试。',
				"1020": '保存失败，文件已被删除或移动。',
				"1028": '保存失败，文件数超过单目录最大限制。',
				"1053": '您的网盘空间不足，未能保存这些文件。',
				"1119": '您的网盘空间已满，未能保存这些文件。',
				"1024": '网络问题，请稍后重试。',
				"102030": '操作过于频繁，请稍后重试。',
				"102031": '保存失败，您一次转存的文件太多。'
			};
			var msg = arr[rsp_head["ret"]] || '保存出错';
			var type = arr[rsp_head["ret"]] ? 'warn': 'err';
			_showSavedErr(msg, type);
		}
	}
	var _initShareToWeiyun = function(decodeInfo, share_pwd) {
		var ret = decodeInfo.ret;
		if (ret == 0) {
			if (decodeInfo.flag == 1) {
				_pitch_share_info = {
					"share_key": decodeInfo.sharekey,
					"src_pdir_key": decodeInfo.pdir_key,
					"dst_ppdir_key": "",
					"dst_pdir_key": "",
					"src_uin": decodeInfo.uin,
					"files": decodeInfo.file_list,
					"dirs": [],
					"os_info": encodeURIComponent(_getOSname()),
					"browser": encodeURIComponent(_getBSname())
				};
				_pitchStore(share_pwd);
			} else {
				var fileArr = [],
				dirArr = [];
				for (var i = 0; i < decodeInfo.dir_list.length; i++) {
					dirArr.push({
						dir_key: decodeInfo.dir_list[i].dir_key,
						dir_name: decodeInfo.dir_list[i].dir_name
					});
				}
				for (var i = 0; i < decodeInfo.file_list.length; i++) {
					fileArr.push({
						file_id: decodeInfo.file_list[i].file_id,
						file_name: decodeInfo.file_list[i].file_name
					});
				}
				_pitch_share_info = {
					"share_key": decodeInfo.sharekey,
					"src_pdir_key": decodeInfo.pdir_key,
					"dst_ppdir_key": "",
					"dst_pdir_key": "",
					"src_uin": decodeInfo.uin,
					"files": fileArr,
					"dirs": dirArr,
					"os_info": encodeURIComponent(_getOSname()),
					"browser": encodeURIComponent(_getBSname())
				};
				_pitchStore(share_pwd);
			}
		} else {
			_showSavedErr('保存出错', 'err');
		}
		_outlinklog(2);
	};
	var _showSaving = function() {
		$('.ui-mask').removeClass('hide');
		$('.file-pop').removeClass('hide');
		$('.file-saved').addClass('hide');
		$('.file-save-fail').addClass('hide');
		$('.ui-pop-close').addClass('hide');
		$('.file-saving').removeClass('hide');
		$('.file-saving').html('<img id="link_loding" width="25" height="25" style="vertical-align:middle;" /><span class="ui-tips-text">正在保存</span>');
		var _percent = 1;
		_timerLoading = setInterval(function() {
			var number = (_percent % 11 == 0) ? 11 : _percent % 11;
			_percent++;
			$('#link_loding').attr('src', 'http://imgcache.qq.com/vipstyle/nr/box/web/images/link_loading/' + number + '.png');
		},
		100);
	};
	var _showSavedSuc = function() {
		$('.ui-mask').removeClass('hide');
		$('.file-pop').removeClass('hide');
		$('.file-saving').addClass('hide');
		$('.file-save-fail').addClass('hide');
		$('.file-saved').removeClass('hide');
		$('.ui-pop-close').removeClass('hide');
		$('.ui-pop-close').click(function() {
			$('.ui-mask').addClass('hide');
			$('.file-pop').addClass('hide');
			$('.file-saving').addClass('hide');
			$('.file-saved').addClass('hide');
			$('.file-save-fail').addClass('hide');
			$('.ui-pop-close').addClass('hide');
			return false;
		});
		$('.ui-mask').click(function() {
			$('.ui-mask').addClass('hide');
			$('.file-pop').addClass('hide');
			$('.file-saving').addClass('hide');
			$('.file-saved').addClass('hide');
			$('.file-save-fail').addClass('hide');
			$('.ui-pop-close').addClass('hide');
		});
	};
	var _showSavedErr = function(msg, type) {
		$('.ui-mask').removeClass('hide');
		$('.file-pop').removeClass('hide');
		$('.file-saving').addClass('hide');
		$('.file-saved').addClass('hide');
		$('.file-save-fail').removeClass('hide');
		$('.ui-pop-close').removeClass('hide');
		var f = type == 'err' ? 'warn': 'err';
		$('#save-error-d').removeClass('file-save-' + f).addClass('file-save-' + type).html('<i class="ui-icon icon-save-err"></i>' + msg);
		$('#save-error-p').html('<i class="ui-icon icon-save-' + type + '"></i>' + msg);
		$('.ui-pop-close').click(function() {
			$('.ui-mask').addClass('hide');
			$('.file-pop').addClass('hide');
			$('.file-saving').addClass('hide');
			$('.file-saved').addClass('hide');
			$('.file-save-err').addClass('hide');
			$('.ui-pop-close').addClass('hide');
			return false;
		});
	};
	var _getQStr = function(str) {
		var LocString = String(window.document.location.href);
		try {
			LocString = decodeURIComponent(LocString);
		} catch(e) {
			LocString = unescape(LocString);
		}
		var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(LocString),
		tmp;
		if (tmp = rs) return tmp[2];
		return "";
	};
	var _verifyPwd = function(share_key, pwd, verify_code) {
		var data = {
			"share_key": share_key,
			"share_pwd": pwd
		},
		_xhr;
		if (verify_code) {
			data.code = verify_code;
		}
		_xhr = _queryXhr2("view_share", data, 0, 'http://web2.cgi.weiyun.com/wy_share_v2.fcg',
		function(_obj) {
			if (_obj.rsp_header) {
				if (_obj.rsp_header["ret"] == 114500 || _obj.rsp_header["ret"] == 114303) {
					$('#errInfo').html('密码错误，请重新输入');
					for (var i = 1; i <= 4; i++) {
						$('#' + i).val('');
					}
					$('.ui-btn-blue').addClass('ui-btn-blue-disabled');
					$('#1').focus();
					if (_is_need_verify_code()) {
						_change_verify_code();
					}
				} else if (_obj.rsp_header["ret"] == 114304) {
					_show_verify_code();
					$('#errInfo').html('密码错误次数过多，请输入验证码');
				} else if (_obj.rsp_header["ret"] == 114305) {
					_change_verify_code();
					$('#errInfo').html('验证码错误，请重新输入');
				} else if (_obj.rsp_header["ret"] == 0) {
					var hasParam = (window.location.href.indexOf('?') > -1);
					_clear_verify_code_pwd();
					window.location.href = window.location.href + (hasParam ? '&': '?') + 'pwd=' + pwd;
				} else {
					$('#errInfo').html('服务器繁忙，请稍后再试');
					if (_is_need_verify_code()) {
						_change_verify_code();
					}
				}
			} else {
				$('#errInfo').html('服务器繁忙，请稍后再试');
				_outlinklog(_obj.rsp_header.ret);
				if (_is_need_verify_code()) {
					_change_verify_code();
				}
			}
		});
		_outlinklog(3);
	}
	var _clear_verify_code_pwd = function() {
		$('#1').val('');
		$('#2').val('');
		$('#3').val('');
		$('#4').val('');
		$('#_outlink_code').val('');
	}
	var _is_needed_verify_code = false;
	var _show_verify_code = function() {
		_change_verify_code();
		$('#_verify_code_con').show();
		_set_need_verify_code(true);
	};
	var _set_need_verify_code = function(need) {
		_is_needed_verify_code = !!need;
	};
	var _is_need_verify_code = function() {
		return _is_needed_verify_code;
	};
	var _change_verify_code = function() {
		$('#_verify_code_img')[0].src = 'http://captcha.weiyun.com/getimage?aid=543009514&' + Math.random();
	};
	var fix_size = function($preload_img, contains_size) {
		var img = $preload_img[0],
		img_width = img.width,
		img_height = img.height,
		img_url = img.src;
		var win_width = contains_size.width,
		win_height = contains_size.height,
		padding = contains_size.padding,
		new_img_width = Math.min(img_width, win_width - padding),
		new_img_height = Math.min(img_height, win_height - padding),
		limit_side,
		limit_size = '',
		size = {};
		if (new_img_width === img_width && new_img_height === img_height) {
			size['width'] = img_width;
			size['height'] = img_height;
		} else {
			if (new_img_width < img_width && new_img_height < img_height) {
				limit_side = 'height';
				limit_size = new_img_height;
				if ((img_width / new_img_width) > (img_height / new_img_height)) {
					limit_side = 'width';
					limit_size = new_img_width;
				}
			} else {
				if (new_img_width < img_width) {
					limit_side = 'width';
					limit_size = new_img_width;
				} else if (new_img_height < img_height) {
					limit_side = 'height';
					limit_size = new_img_height;
				}
			}
			size[limit_side] = limit_size;
			if (limit_side === 'width') {
				size['height'] = Math.round(img_height / img_width * limit_size);
			} else {
				size['width'] = Math.round(img_width / img_height * limit_size);
			}
		}
		return size;
	};
	var _init_verifycode_down = function(share_key, pwd) {
		var data = {
			"share_key": share_key,
			"share_pwd": pwd
		};
		_queryXhr2("view_share", data, 0, "http://web2.cgi.weiyun.com/wy_share_v2.fcg",
		function(_obj) {
			var ret = _obj.rsp_header.ret;
			if (ret == 0) {
				var share_info = _obj.rsp_body;
				share_info.sharekey = share_key;
				_init_verify_down_param(share_info);
			} else {
				alert('拉取外链信息失败，请刷新重试');
			}
		});
	};
	_show_down_verifycode = function() {
		$('#img_code')[0].src = 'http://captcha.weiyun.com/getimage?aid=543009514&' + Math.random();
	};
	_init_verify_down_param = function(shareInfo) {
		_show_down_verifycode();
		var $imgcode = $('#a_refresh_img'),
		$imgcode2 = $('#a_refresh_img2');
		$imgcode.on('click',
		function(e) {
			e.preventDefault();
			_show_down_verifycode();
		});
		$imgcode2.on('click',
		function(e) {
			e.preventDefault();
			_show_down_verifycode();
		});
		var $submit = $('#submit_code'),
		$input = $('#input_code'),
		$errmsg = $('#infor');
		$input.on('focus',
		function() {
			$errmsg.hide();
		});
		$submit.on('click',
		function(e) {
			e.preventDefault();
			var code = $.trim($input.val());
			if (code.length == 4) {
				QQDISK_MOBILE_OUTLINK.initDownload(shareInfo, code);
			} else {
				$errmsg.show();
			}
		});
	};
	var _init = function(shareInfo) {
		var auto_save = _getQStr("as");
		if (auto_save == "1") {
			_initShareToWeiyun(shareInfo);
		}
		_outlinklog(0);
	};
	return {
		init: _init,
		initDownload: _initDownload,
		initShareToWeiyun: _initShareToWeiyun,
		get_info_sharekey: _get_info_sharekey,
		verifyPwd: _verifyPwd,
		is_need_verify_code: _is_need_verify_code,
		change_verify_code: _change_verify_code,
		fix_size: fix_size,
		init_verifycode_down: _init_verifycode_down,
		show_down_verifycode: _show_down_verifycode
	};
})();
/* |xGv00|f0925efc1d938a26a4e1438066e8898f */
