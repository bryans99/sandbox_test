# IFRAME sandbox exploration

Simple exploration of IFRAME sandbox with allow scripts and allow-same-origin. This was prompted by discussion of sandbox [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

>> When the embedded document has the same origin as the embedding page, it is strongly discouraged to use both allow-scripts and allow-same-origin,
>> as that lets the embedded document remove the sandbox attribute — making it no more secure than not using the sandbox attribute at all.

Unfortunately, the document doesn't provide details of what the issue is but after further research it turns out that it's pointless to sandbox if the parent of the IFRAME and the IFRAME are loaded from the same domain (i.e. same origin). If the parent of the IFRAME and IFRAME are loaded from different domains the sandbox is enforced.

This little app(?) demonstrates the issues. There are three options, two of which the sandbox has no effect, the third which does.

1. IFRAME uses src and as such is loaded from the same domain as the parent. Pointless.
2. IFRAME uses srcdoc and as such is treated as loaded from the same domain as the parent. Pointless.
3. IFRAME uses src with the srcdoc encoded as a data attribute `(src="data:text/html;base64,CiAgPCFk...bWw+CiAg")`. This actually honors the sandbox.

A running demo can be found [here](http://glossy-noise.surge.sh/).

## Install

`npm install` or `yarn`

## Run

`yarn start-http` or `npm run start-http`

Connect to `http://localhost:8080`