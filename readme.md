






<a href='https://rwserve.readwritetools.com'><img src='./img/rwserve.png' width=80 align=right /></a>

###### *clacks-overhead: GNU Terry Pratchett *

# RWSERVE Custom Header


<table>
	<tr><th>Abstract</th></tr>
	<tr><td>This is perhaps the simplest possible plugin that actually does something useful. A custom header and value are added to every outgoing response that matches a given path-pattern.</td></tr>
</table>

### Motivation

Outgoing headers are an integral part of the request/response cycle serving to
provide additional information to the requestor beyond what's available through
standard HTTP headers or the response body. Extra headers are especially
important when establishing your own protocol for database requests using the
PUT, PATCH, POST, and DELETE methods.

Error messages are perhaps the most common use for custom headers, but other
uses related the server's state; resource metadata; alternative content; and so
forth, are possible.

This plugin is open source and can be used as is, or repurposed into something
less whimsical than just "Hello World!", such as:

   * Adding custom headers during development for debugging, version control, etc.
   * Conditionally adding custom headers that are intended for consumption by log
      monitoring utilities.
   * Providing custom headers in alternative languages to advertise non-obvious
      features of your website.

<pre>
cd /srv/rwserve-plugins
npm install rwserve-custom-header
</pre>

### Configuration is Everything

Make the software available by declaring it in the `plugins` section of your
configuration file. For detailed instructions on how to do this, refer to the <a href='https://rwserve.readwritetools.com/plugins.blue'>plugins</a> documentation
on the `Read Write Tools HTTP/2 Server` website.

#### TL;DR

<pre>
plugins {
    rwserve-custom-header {
        location `/srv/rwserve-plugins/node_modules/rwserve-custom-header/dist/index.js`
        config {
            header-name   clacks-overhead
            header-value  GNU Terry Pratchett
        }
    }
    router {
        `*`  *methods=GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,TRACE  *plugin=rwserve-custom-header
    }    
}
</pre>

The `config` settings are straightforward:

`header-name` is the name of the response header you wish to add. The HTTP/2
protocol requires this name to comprise only lowercase letters, digits, and
HYPHENs.

`header-value` is the string value you wish to associate with the header. This
value should consist of ISO-8859-1 characters only. UTF-8 characters can be
used, but only when encoded according to the specification in IETF RFC 5987
"Character Set and Language Encoding for Hypertext Transfer Protocol (HTTP)
Header Field Parameters"

The sample `router` shown above will route all messages (```*```) for *any* HTTP method,
to the plugin.

#### Cookbook

A full configuration file with typical settings for a server running on
localhost port 7443, is included in this NPM module at `etc/custom-header-config`.
To use this configuration file, adjust these variables if they don't match your
server setup:

<pre>
$PLUGIN-PATH='/srv/rwserve-plugins/node_modules/rwserve-custom-header/dist/index.js'
$PRIVATE-KEY='/etc/pki/tls/private/localhost.key'
$CERTIFICATE='/etc/pki/tls/certs/localhost.crt'
$DOCUMENTS-PATH='/srv/rwserve/configuration-docs'
</pre>

### Prerequisites

This is a plugin for the **Read Write Tools HTTP/2 Server**, which works on Linux
platforms. Windows, MacOS and BSD are not supported.


<table>
	<tr><th>Software</th> <th>Minimum Version</th></tr>
	<tr><td>Ubuntu</td> <td>16</td></tr>
	<tr><td>Debian</td> <td>9</td></tr>
	<tr><td>Fedora</td> <td>27</td></tr>
	<tr><td>CentOS</td> <td>7.4</td></tr>
	<tr><td>RHEL</td> <td>8</td></tr>
	<tr><td>RWSERVE</td> <td>1.0</td></tr>
	<tr><td>Node.js</td> <td>10.3</td></tr>
</table>

## Review


<table>
	<tr><th>Lessons</th></tr>
	<tr><td>This plugin demonstrates a basic pattern that many plugins follow: <ul><li>Accessing configuration variables from the plugin.</li> <li>Omitting any calls to <code>setStatusCode()</code>, thus allowing the full request/response processing sequence to continue unimpeded.</li> </ul> Find other plugins for the <code>Read Write Tools HTTP/2 Server</code> using <a href='https://npmsearch.com?q=author:readwritetools'>npmsearch</a> with these keywords: <kbd>rwserve</kbd>, <kbd>http/2</kbd>, <kbd>plugin</kbd>. </td></tr>
</table>

<p align=center><a href='https://readwritetools.com'><img src='./img/rwtools.png' width=80 /></a></p>
