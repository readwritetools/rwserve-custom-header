//=============================================================================
//
// File:         rwserve-custom-header/index.js
// Language:     ECMAScript 2015
// Copyright:    Read Write Tools © 2018
// License:      MIT License
// Initial date: Aug 25, 2018
//
// Contents:     An RWSERVE plugin to add a custom response header to the outgoing response.
//               No status code is set, allowing the full processing sequence to occur normally.
//               This is safe to use early in the chain of plugins and will not inhibit
//               subsequent plugins from being called.
//               Suitable for use with all HTTP methods
//
//======================== Sample configuration ===============================
/*
	plugins {
		rwserve-custom-header {
			location `/srv/rwserve-plugins/rwserve-custom-header.class.js`
			config {
				header-name   clacks-overhead
				header-value  GNU Terry Pratchett
			}
		}
		router {
			`*`  *methods=GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,TRACE  *plugin=rwserve-custom-header
		}	
	}
*/
//=============================================================================

var log = require('rwserve-plugin-sdk').log;

module.exports = class RwserveCustomHeader {

	constructor(hostConfig) {
		this.hostname    = hostConfig.hostname;
		this.headerName  = hostConfig.pluginsConfig.rwserveCustomHeader.headerName;		// clacks-overhead
		this.headerValue = hostConfig.pluginsConfig.rwserveCustomHeader.headerValue;	// GNU Terry Pratchett
    	Object.seal(this);
	}
	
	async startup() {
		log.debug('RwserveCustomHeader', 'v1.0.0; © 2018 Read Write Tools; MIT License'); 
	}
	
	async shutdown() {
		log.debug('RwserveCustomHeader', `Shutting down ${this.hostname}`); 
	}
	
	async processingSequence(workOrder) {
		try {
			workOrder.addStdHeader(this.headerName, this.headerValue);
		}
		catch (err) {
			log.error(err.message);
		}
	}
}
