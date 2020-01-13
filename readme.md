







<figure>
	<img src='/img/plugins/custom-header/custom-header-pixaby-ninita_7.jpg' width='100%' />
	<figcaption></figcaption>
</figure>

# Custom Header

## A simple but useful first plugin


<address>
<img src='/img/rwtools.png' width=80 /> by <a href='https://readwritetools.com' title='Read Write Tools'>Read Write Tools</a> <time datetime=2018-10-22>Oct 22, 2018</time></address>



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

#### Customization

This plugin is open source and can be used as is, or repurposed into something
less whimsical than just "Hello World!", such as:

   * Adding custom headers during development for debugging, version control, etc.
   * Conditionally adding custom headers that are intended for consumption by log
      monitoring utilities.
   * Providing custom headers in alternative languages to advertise non-obvious
      features of your website.

### Download

The plugin module is available from <a href='https://www.npmjs.com/package/rwserve-custom-header'>NPM</a>
. Before proceeding, you should already have `Node.js` and `RWSERVE` configured and
tested.

This module should be installed on your web server in a well-defined place, so
that it can be discovered by `RWSERVE`. The standard place for public domain
plugins is `/srv/rwserve-plugins`.

<pre>
cd /srv/rwserve-plugins
npm install rwserve-custom-header
</pre>

### Configuration is Everything

Make the software available by declaring it in the `plugins` section of your
configuration file. For detailed instructions on how to do this, refer to the <a href='https://rwserve.readwritetools.com/plugins.blue'>plugins</a>
documentation on the `Read Write Tools HTTP/2 Server` website.

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

#### Deployment

Once you've tested the plugin and are ready to go live, adjust your production
web server's configuration in `/etc/rwserve/rwserve.conf` and restart it using `systemd`
. . .

<pre>
[user@host ~]# systemctl restart rwserve
</pre>

. . . then monitor its request/response activity with `journald`.

<pre>
[user@host ~]# journalctl -u rwserve -ef
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

### Review


<table>
	<tr><th>Lessons</th></tr>
	<tr><td>This plugin demonstrates a basic pattern that many plugins follow: <ul><li>Accessing configuration variables from the plugin.</li> <li>Omitting any calls to <code>setStatusCode()</code>, thus allowing the full request/response processing sequence to continue unimpeded.</li> </ul> Find other plugins for the <code>Read Write Tools HTTP/2 Server</code> using <a href='https://www.npmjs.com/search?q=keywords:rwserve'>npm</a> with these keywords: <kbd>rwserve</kbd>, <kbd>http2</kbd>, <kbd>plugins</kbd>. </td></tr>
</table>

### License

The <span>rwserve-custom-header</span> plugin is licensed under
the MIT License.

<img src='/img/blue-seal-mit.png' width=80 align=right />

<details>
	<summary>MIT License</summary>
	<p>Copyright © 2020 Read Write Tools.</p>
	<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
	<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
	<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
</details>

### Availability


<table>
	<tr><td>Source code</td> 			<td><a href='https://github.com/readwritetools/rwserve-custom-header'>github</a></td></tr>
	<tr><td>Package installation</td> <td><a href='https://www.npmjs.com/package/rwserve-custom-header'>NPM</a></td></tr>
	<tr><td>Documentation</td> 		<td><a href='https://hub.readwritetools.com/plugins/custom-header.blue'>Read Write Hub</a></td></tr>
</table>

