# AntiCaptcha2 🤖

A simple NodeJS package for solving almost all types of captchas using  [https://anti-captcha.com](http://getcaptchasolution.com/aabp49czdj)

## Table of contents
- [Features](#features)
- [API key](#api-key)
- [Anticaptcha](#anticaptcha)
- [Proxy](#proxy)
- [Tasks](#tasks)
- [Form](#form)


---


## Features
- Simple to use.
- Solving almost all types of captcha ([reCAPTCHA](https://developers.google.com/recaptcha/docs/display), [GeeTest](https://www.geetest.com/en), [FunCaptcha](https://funcaptcha.com), [Classic image to text](https://en.wikipedia.org/wiki/CAPTCHA), [SquareNetTextTask](https://anticaptcha.atlassian.net/wiki/x/AQB4G)).
- Easy creating and solving [custom tasks](https://anticaptcha.atlassian.net/wiki/x/KYApDg).
- Support Proxy
- Support Timeout
- Full ...???


---


## API key

Before using this package you should recharge the balance and get API-key. Step by step:

- Create account at [anti-captcha.com](http://getcaptchasolution.com/wnmbdo50o8).
- Recharge the balance (*Finance > Add Funds*).
- Create API-key (*Settings > API setup*).
- That's all.


---


## Anticaptcha

[TODO: add text]

### `new Anticaptcha(apikey, [proxy])`

The class creates an object that wraps the anti-captcha API.
`apikey` - API key, which can be obtained in [account settings](https://anti-captcha.com/clients/settings/apisetup)
`proxy` -  is an optional parameter that specifies the default proxy. See [`Proxy`](#new-proxyopts).

```js
const Anticaptcha = require('anticaptcha2');
const Proxy = Anticaptcha.Proxy;

let anticaptcha = new Anticaptcha('API_KEY', new Proxy({...}));
```


### `anticaptcha.getProxy()`

Method to get the default proxy. If no proxy is specified, it will return `null`.


### `anticaptcha.setProxy(proxy)`

Method to set the default proxy.
`proxy` - either an instance of the class `Proxy` or an object with parameters like the class of [`Proxy`](#new-proxyopts)


### `anticaptcha.method(method, [data, [isPrivate]])`

Method for calling the custom anti-captcha API method. Returns `Promise`.

- `method` - string method name
- `data` - object with data. (*Default:* `{}`)
- `isPrivate` - whether you need to add an api-key to the request. Only needed for private methods. (*Default:* `false`)


### `anticaptcha.getBalance()`

Method to fetch account balance. Returns `Promise`.

```js
anticaptcha.getBalance()
  .then(balance => {
    console.log(`Balance: ${balance}$`);
  })
;
```

### `anticaptcha.getQueueStats(queueId)`

This method allows to define if it is suitable time to upload new task. Results are cached for 10 seconds. Returns `Promise`.
`queueId` - id of the queue. The following queues are available:

- **1** - standart ImageToText, English language
- **2** -  standart ImageToText, Russian language
- **5** - Recaptcha NoCaptcha tasks
- **6** - Recaptcha Proxyless task
- **7** - Funcaptcha
- **10** - Funcaptcha Proxyless

```js
anticaptcha.getQueueStats(1)
  .then(stats => {
    console.log(stats);
    /*
    {
      waiting: 242,
      load: 60.33,
      bid: "0.0008600982",
      speed: 10.77,
      total: 610
    }
    */
  })
;
```

**Response:**

| Field     | Description |
| --------- | ----------- |
| `waiting` | Amount of idle workers online, waiting for a task |
| `load`    | Queue load in percents |
| `bid`     | Average task solution cost in USD |
| `speed`   | Average task solution speed in seconds |
| `total`   | Total number of workers |


### `anticaptcha.solve(task, [opts])`

It's a fast and simple alias for methods [anticaptcha.createTask(task, opts)](#anticaptchacreatetasktask-opts) and [anticaptcha.getTaskResult(taskId)](#anticaptchagettaskresulttaskid-opts).


### `anticaptcha.createTask(task, [opts])`

This method creates a task for solving selected captcha type. Returns ID of the created task.

- `task` - task-object (plain object with key-values) or [`Task`](#new-taskopts-proxy) instance.
- `opts` - optional `object` with extra params:
  - `softId` - ID of your application from out [AppCenter](https://anti-captcha.com/clients/tools/appcenter/top)
  - `languagePool` - Sets workers pool language. At the moment the following language pools are available: <br>**en** (default) - English language queue <br>**rn**  : group of countries: Russia, Ukraine, Belarus, Kazahstan
  - `callbackUrl` -  web address were will send result of captcha/factory task processing. Contents are sent by AJAX POST request and are similar to the contents of [`anticaptcha.getTaskResult`](#anticaptchagettaskresulttaskid-opts) method.


### `anticaptcha.getTaskResult(taskId, [opts])`

Request task result. If the task is not completed, the `status` will be `processing`. Returns `Promise`.

- `taskId` - ID of the task.
- `opts` - optional `object` with extra params:
  - `extended` - If `true` method will return extended result of task (with `cost`, `ip` et.c.). Otherwise - only `solution`. (*Default:* `false`)
  - `wait` - set to `true` to wait for a solution of the task. (*Default:* `false`)
  - `waitTime` - if `wait` is `true`, then this parameter can specify timeouts to check the result of the task. It's an 2-elements `array`: first element - first request delay, second - second and next request. Numbers in `ms`. (*Defaults:* `[5000, 2000]` )
  - `timeout` - Define max time to solve captcha. If function hit timeout, it throw `ERROR_TIMEOUT_HIT` error. Work only if `wait` is `true`. Numbers in `ms`. (*Defaults:* `false` )

```js
// Task is not ready
anticaptcha.getTaskResult(1).then(res => {
  console.log(res);
  // undefined
});

// Task is not ready
anticaptcha.getTaskResult(1, { extended: true }).then(res => {
  console.log(res);
  // { status: 'processing' }
});


// Task is ready
anticaptcha.getTaskResult(1).then(res => {
  console.log(res);
  /* {
    gRecaptchaResponse: '03ADlfD18SShzn11....',
    gRecaptchaResponseMD5: 'dd32a86659c94097f5d63c6557aa2fb9'
  } */
});

// Task is ready
anticaptcha.getTaskResult(1, { extended: true }).then(res => {
  console.log(res);
  /* {
  status: 'ready',
  solution: {
    gRecaptchaResponse: '03ADlfD18S....',
    gRecaptchaResponseMD5: 'dd32a86659c94097f5d63c6557aa2fb9'
  },
  cost: '0.002200',
  ip: '108.113.114.0',
  createTime: 1543247549,
  endTime: 1543247573,
  solveCount: 0
  } */
});

// Waiting
// The promise will be fulfilled when the status of the task is "fulfilled".
// By default first try in 5 sec, second and next - in 2 sec.
anticaptcha.getTaskResult(1, { wait: true }).then(res => {
  console.log(res);
  /* {
    gRecaptchaResponse: '03ADlfD18SShzn11....',
    gRecaptchaResponseMD5: 'dd32a86659c94097f5d63c6557aa2fb9'
  } */
});

// Waiting
// You can set timeouts. In this example: 1st - 2 sec, 2nd and next = 1 sec.
anticaptcha.getTaskResult(1, { wait: true, waitTime: [2000, 1000] }).then(res => {
  console.log(res);
  /* {
    gRecaptchaResponse: '03ADlfD18SShzn11....',
    gRecaptchaResponseMD5: 'dd32a86659c94097f5d63c6557aa2fb9'
  } */
});
```


### `anticaptcha.reportIncorrectImageCaptcha(taskId)`

Complaints are accepted only for image captchas. Your complaint will be checked by 5 workers, 3 of them must confirm it. Only then you get full refund.
**Note:** If you have less than *20%* confirmation ratio, your reports will be ignored.


### `anticaptcha.test(data)`

This method reads request data, parses it and outputs as array. It also outputs post data in a raw format. You may use it for debugging your code.
`data` -  anything (`string/number/object/array`)

```js
anticaptcha.test({a: "a"}).then(res => {
  console.log(res)
  /*
    Parsed input JSON:
    Array
    (
    [a] => a
    )
    Raw POST input:
    {"a":"a"}
  */
});
```

---


## Proxy

At the moment almost all captcha services do not have protection from situations when the puzzle is solved on one IP address and form with captcha-response is submitted from another IP.

```js
const Proxy = require('anticaptcha2').Proxy;

let proxy = new Proxy({
  type: 'http',
  address:'8.8.8.8',
  port: '8080',
  agent: 'Mozilla/5.0 ...'
});
```


### `new Proxy(opts)`

The constructor will not check the required fields. This is done so that you later set some fields (see [`Proxy.checkProxy()`](#proxycheckproxyproxydata))

| Name       | Type     | Required | Description |
| ---------- | -------- | -------- | ----------- |
| `type`     | `String` | `true`   | Type of proxy. <ul><li>`http` - usual **http/https**</li><li>`socks4` - **socks4**</li><li>`socks5` - **socks5**</li></ul> |
| `address`  | `String` | `true`   | Proxy IP address ipv4/ipv6. Not allowed to use: <ul><li>host names instead of IPs</li><li>transparent proxies (where client IP is visible)</li><li>proxies from local networks (192.., 10.., 127...)</li></ul> |
| `port`     | `String` | `true`   | Port of proxy |
| `login`    | `String` | `false`  | Login for proxy which requires authorizaiton (basic) |
| `password` | `String` | `false`  | Proxy password |
| `agent`    | `String` | `true`   | Browser's *User-Agent* which is used in emulation. It is required that you use a signature of a modern browser, otherwise Google will ask you to "update your browser" |
| `cookies`  | `String` | `false`  | Additional cookies which we must use during interaction with target page or Google. <br>**Format:** `'cookie1=value1; cookie2=value2'` |

**Note:** `opts` can by another instance of Proxy. Constructor will copy all parametrs.

### `proxy.set(opts, [reset])`

The way to change the proxy settings.
`opts` - like constructor's `opts`.
`reset` - if `false` - then opts overwrite the previous parameters. Otherwise - previous ones will be erased and new ones will be recorded. (*Default:* `false`)


### `proxy.get()`

Returns proxy parametrs.

```js
let proxy = new Proxy({
  type: 'http',
  address: '8.8.8.8',
  port: '8080',
  login: 'user',
  password: 'pass',
  agent: 'Mozilla/5.0 ...',
  cookies: 'cookie1=value1; cookie2=value2'
});

console.log(proxy.get());
/*
{
  type: 'http',
  address: '8.8.8.8',
  port: '8080',
  login: 'user',
  password: 'pass',
  agent: 'Mozilla/5.0 ...',
  cookies: 'cookie1=value1; cookie2=value2'
}
*/
```


### `proxy.toJSON([check])`

Returns JSON-object. If `check = true` check required proxy settings (*Default:* `false`).

```js
let proxy = new Proxy({
  type: 'http',
  address: '8.8.8.8',
  port: '8080',
  login: 'user',
  password: 'pass',
  agent: 'Mozilla/5.0 ...',
  cookies: 'cookie1=value1; cookie2=value2'
});

console.log(proxy.toJSON());
/*
{
  proxyType: 'http',
  proxyAddress: '8.8.8.8',
  proxyPort: '8080',
  proxyLogin: 'user',
  proxyPassword: 'pass',
  userAgent: 'Mozilla/5.0 ...',
  cookies: 'cookie1=value1; cookie2=value2'
}
*/
```


### `Proxy.checkProxy(proxyData)`

Static method of the class `Proxy` for checking the required fields of the proxy. If some required field is not specified, it will throw the error. Will return `true` if all is good.

```js
let proxy = new Proxy({
  type: 'socks4',
  address: '8.8.8.8',
  port: '8080'
});

Proxy.checkProxy({
  type: 'socks4',
  address: '8.8.8.8',
  port: '8080'
});
// Same as
Proxy.checkProxy(proxy.get());
// Same as
Proxy.checkProxy(proxy);

// All above throw Error('No agent');
```


---


## Tasks

For quick and easy use of api, use list of classes that implement all supported task types:

- [`ImageToTextTask`](#new-imagetotexttaskopts) - Classic image to text captcha
- [`NoCaptchaTask`](#new-nocaptchataskopts-proxy) - [Google's reCAPTCHA v2](https://developers.google.com/recaptcha/docs/display) (*I'm not a robot*).
- [`GeeTestTask`](#new-geetesttaskopts-proxy) - [GeeTest](https://www.geetest.com/en/)
- [`FunCaptchaTask`](#new-funcaptchataskopts-proxy) - [FunCaptcha](https://funcaptcha.com)
- [`SquareNetTextTask`](#new-squarenettexttaskopts) - Something like Google's pazzle (find bus on pictures), but too old
- [`CustomCaptchaTask`](№new-customcaptchataskopts) - Custom tasks. [TODO: more text]


```js
const Anticaptcha = require('anticaptcha2');

const ImageToTextTask = Anticaptcha.ImageToTextTask;
const NoCaptchaTask = Anticaptcha.NoCaptchaTask;
// etc ...
```


### `new <Task>(opts, [proxy])`

Create new task (*type of task is determined by the class name*) with `opts` and `proxy` (if it's type of task support proxy mod).


### `<task>.type`

Property that returns the task type. *Note:* you can not set type of task, it is determines automaticaly.


### `<task>.data`

Getter/Setter that helps to get/set task opts.


### `<task>.proxy`

Getter/Setter that helps to get/set proxy of the task. It's can be or `Boolean` (`true`/`false`) or `Proxy` instance ot proxy-object. If setted `true`, the proxy params before sending the request will be taken from the default proxy data from `Anticaptcha` instance.
**Note:** if task supports proxy-mod, then type will automatically switched.


### `<task>.toJSON()`

Serialization task opts for API request.


#### Result of task

[TODO: add text]


#### `new ImageToTextTask(opts)`

Classic task convert text from image to textbox.

**Params (`otps`)**:

| Field     | Type             | Required | Default | Description  |
| --------- | ---------------- | -------- | ------- | ------------ |
| `body`    | `String`         | `yes`    | -       | File body encoded in base64. Make sure to send it without line breaks. |
| `phrase`  | `Boolean`        | `no`     | `false` | `false` - no requirements <br>`true` - worker must enter an answer with at least one "space" |
| `case`    | `Boolean`        | `no`     | `false` | `false` - no requirements <br>`true` - worker will see a special mark telling that answer must be entered with case sensitivity |
| `numeric` | `Integer`        | `no`     | `0`     | `0` - no requirements <br>`1` - only number are allowed <br>`2` - any letters are allowed except numbers |
| `math`    | `Boolean`        | `no`     | `false` | `false` - no requirements <br>`true` - worker will see a special mark telling that answer must be calculated |
| `length`  | `Array<Integer>` | `no`     | `[0,0]` | Set min and max length of an answer. First element - min, second - max. <br>`0` - no requirements <br>`>1` - defines min/max length of the answer |
| `comment` | `String`         | `no`     | `''`    | Additional comment for workers like "enter letters in red color" |

**Result:**
```js
{
  text: "the answer",
  url: "http://webaddress.com/captcha.jpg"
}
```


#### `new NoCaptchaTask(opts, [proxy])`

[Google's reCAPTCHA v2](https://developers.google.com/recaptcha/docs/display) (*I'm not a robot*).
**Note:** supports proxy mod.

**Params (`otps`)**:

| Field       | Type      | Required | Description |
| ----------- | --------- | -------- | ----------- |
| `url`       | `String`  | `yes`    | Address of target web page |
| `sitekey`   | `String`  | `yes`    | Recaptcha website key <br>`<div class="g-recaptcha" data-sitekey="THAT_ONE"></div>` |
| `stoken`    | `String`  | `no`     | **Deprecated** |
| `isVisible` | `Boolean` | `no`     | Specify if Recaptcha is invisible |

**Result:**

```js
{
  gRecaptchaResponse: "3AHJ_VuvYIBNBW5yyv0zRYJ75VkOKvhKj9_xGBJKnQimF72rfoq3Iy-DyGHMwLAo6a3"
}
```

| Field                | Type     | Description |
| -------------------- | -------- | ----------- |
| `gRecaptchaResponse` | `String` | Hash string which is required for interacting with submit form on target website. It looks like this: <br>`<textarea id="g-recaptcha-response" ..></textarea>` |


#### `new GeeTestTask(opts, [proxy])`

[GeeTest](https://www.geetest.com/en/) captcha.
**Note:** supports proxy mod.

**Params (`otps`)**:

| Field       | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `url`       | `String` | `yes`    | Address of target web page |
| `gt`        | `String` | `yes`    | The domain key |
| `challenge` | `String` | `yes`    | Changing token key. Make sure to grab fresh one for each captcha, otherwise you will be charged for error task. |

**Result:**

```js
{
  challenge: "3c1c5153aa48011e92883aed820069f3hj",
  validate: "47ad5a0a6eb98a95b2bcd9e9eecc8272",
  seccode: "83fa4f2d23005fc91c3a015a1613f803|jordan"
}
```

| Field       | Type     | Description |
| ----------- | -------- | ----------- |
| `challenge` | `String` | Hash string which is required for interacting with submit form on target website |
| `validate`  | `String` | Hash string which is required too |
| `seccode`   | `String` | Another required hash string, we have no idea why there are 3 of them |


### `new FunCaptchaTask(opts, [proxy])`

[FunCaptcha](https://funcaptcha.com)
**Note:** supports proxy mod.

**Params (`otps`)**:

| Field       | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `url`       | `String` | `yes`    | Address of target web page |
| `publickey` | `String` | `yes`    | Funcaptcha public key <br>`<div id="funcaptcha" data-pkey="THIS_ONE"></div>` |

**Result:**

```js
{
  token: "36859d1086acb06e7.08293101|r=ap-southeast-1|metabgclr=%23ffffff|guitextcolor=%23555555|metaiconclr=%23cccccc|meta=3|pk=3B24C079-2DF1-771D-913A-11F824CD5A7C|injs=https://cdn.funcaptcha.com/fc/assets/graphics/etoxic/url_force.js|rid=11|cdn_url=https://cdn.funcaptcha.com/fc|surl=https://funcaptcha.com"
}
```

| Field   | Type     | Description |
| ------- | -------- | ----------- |
| `token` | `String` | Hash string which is required for interacting with submit form on target website. |


### `new SquareNetTextTask(opts)`

This type of tasks takes your image, adds custom grid on it and asks our worker to mark specified objects on it. Something like Google's pazzle (find car on pictures), but too old.

**Params (`otps`)**:

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `body` | `String` | `yes`    | File body encoded in base64. Make sure to send it without line breaks |
| `name` | `String` | `yes`    | Name of the object. *Example:* **banana** |

**Result:**

```js
{
  cellNumbers: [4,6,7]
}
```

| Field         | Type             | Description |
| ------------- | ---------------- | ----------- |
| `cellNumbers` | `Array<Integer>` | Array holding cell numbers which start from 0, left to right, top to the bottom. |


### `new CustomCaptchaTask(opts)`

This type of tasks is suitable for use when you need to describe what is on an image and you need workers to fill a custom form for this.

Examples:

- Read letters and numbers from a car license plate
- Find a phone number on a commercial
- Complete task like "count monkeys on a picture"
- etc.

**Params (`otps`)**:

| Field        | Type          | Required | Description |
| ------------ | ------------- | -------- | -------- |
| `url`        | `String`      | `yes`    | Address of an image |
| `assignment` | `String`      | `no`     | Describe what worker must do in English |
| `forms`      | `form/Object` | `no`     | Custom form object. It can be or JSON-object or instance of [`Form`](#new-form) To build this object you have 3 options: <ul><li>Pass instance of [`Form`](#new-form)</li><li>Use [FormBuilder](https://anti-captcha.com/clients/factories/directory/formbuilder) tool in Anti-Captcha clients area.</li><li>Code it manually using [documentation](https://anticaptcha.atlassian.net/wiki/x/2AB2Ag).</li></ul> |

**Result:**

```js
{
  taskId: 407533072,
  imageUrl: "https://files.anti-captcha.com/26/41f/c23/7c50ff19.jpg",
  assignment: "Enter license plate number",
  status: "complete",
  answers: {
    license_plate: "TONFNTI",
    color: "grey"
  }
}
```

[TODO: add text]


---


## Form

`Form` is created to create forms for [`CustomCaptchaTask`](#new-customcaptchataskopts). It has next fields:

- [`TextField`](#new-textfieldlabel-text) - simple plain text.
- [`LinkField`](#new-linkfieldlabel-url-text) - button-link (*HTML-tag:* `<a>`).
- [`ImageField`](#new-imagefieldlabel-url) - static image (*HTML-tag:* `<img>`).
- [`TextboxField`](#new-textboxfieldlabel-name-opts) - textbox (*HTML-tag:* `<input type="text"></input>`).
- [`TextareaField`](#new-textareafieldlabel-name-opts) - textarea (*HTML-tag:* `<textarea></textarea>`).
- [`CheckboxField`](#new-checkboxfieldlabel-name-text) - checkbox  (*HTML-tag:* `<input type="checkbox"></input>`).
- [`RadioField`](#new-radiofieldlabel-name-keyvals) - list of radio inputs  (*HTML-tag:* `<input type="radio"></input>...`).
- [`SelectField`](#new-selectfieldlabel-name-keyvals) - select (*HTML-tag:* `<select><option>One</option>...</select>`).
- [`ImageUploadField`](#new-imageuploadfieldlabel-name) - file uploader  (*HTML-tag:* `<input type="file"></input>`).


```js
const Form = Anticaptcha.Form;

// Creating form
let form = new Form();
form.add(new Form.TextField('Label of the field', 'Some text...'));
form.add(new Form.TextareaField('Enter some text', 'nameOfArea', {
    placeholder: 'Placeholder for texarea'
}));
form.add(new Form.SelectField('Select HEX', 'nameOfSelect', {
    red: '#F00',
    black: '#000',
    white: '#FFF'
}));

// Creating task
let customTask = new Anticaptcha.CustomCaptchaTask({
    url: 'http://url_to_the_image.com',
    assigment: 'Please answer on questions',
    form: form
});

// Sending task
anticaptcha.solve(customTask).then(res => {
    ...
});
```

[TODO: add image example]

### `new Form()`

[TODO: add text]


### `form.add(field)`

Add new field to form. `field` - instance of any `Field`. Returns `id` of the added field.


### `form.remove(id)`

Remove field from form. `id` - id of the previous added field. Returns `true` if field finded and removed, `false` - otherwise.


### `form.toJSON()`

Stringify `form` to JSON object according to [documentation](https://anticaptcha.atlassian.net/wiki/x/2AB2Ag).


### `Fields`

Some points:

- For all `Field`s **first** argument is `label` - description for the form field or content. Its type  is `String` or `Array<String>` with two elements. If  you passed `Array` then first element will be label, second - subtitle for label. **Example:** `new TextField('Label')` and `new TextField(['Label', 'Subtitle'])`
- For all *dynamic* fields (`TextboxField`, `CheckboxField`, etc.) **second** arguments is `name` - like `<input>` attribute `name`. It's used to get values of [`CustomCaptchaTask`](#new-customcaptchataskopts)'s answers . **Note:** It's must be unique!


#### `new TextField(label, text)`

Plain text. It's *static* field.
Compiled into:

```html
<input type="textbox" value="{text}" disabled>
```

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `text` | `String` | `yes`    | Set text |


#### `new LinkField(label, url, text)`

A link button. It's *static* field.
Compiled into:

```html
<a href="{url}">{text}</a>
```

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `url`  | `String` | `yes`    | Sets link's url |
| `text` | `String` | `yes`    | Sets a body to link |


#### `new ImageField(label, url)`

Image field displays an image with zoom function. It's *static* field.
Compiled into:

```html
<img src="{url}">
```

| Field  | Type     | Required | Description |
| ------ | -------- | -------- | ----------- |
| `url`  | `String` | `yes`    | Sets source url of the image |


#### `new TextboxField(label, name, [opts])`

Single-line text input - `textbox`. It's *dynamic* field.
Compiled into:

```html
<input type"text" name="{name}" placeholder="{opts.placeholder}">
```

| Field               | Type      | Required | Description |
| ------------------- | --------- | -------- | ----------- |
| `opts.placeholder`  | `String`  | `no`     | Sets `input`'s placeholder |
| `opts.width`        | `Integer` | `no`     | Sets width of the `input` in percents. <br>One number from `25`, `33`, `50` or `100` |


#### `new TextareaField(label, name, [opts])`

Multi-line text input - `textarea`. It's *dynamic* field.
Compiled into:

```html
<textarea name="{name}" placeholder="{opts.placeholder}" rows="{opts.rows}"></textarea>
```

| Field               | Type      | Required | Description |
| ------------------- | --------- | -------- | ----------- |
| `opts.placeholder`  | `String`  | `no`     | Sets `input`'s placeholder |
| `opts.width`        | `Integer` | `no`     | Sets width of the `input` in percents. <br>One number from `25`, `33`, `50` or `100` |
| `opts.rows`         | `Integer` | `no`     | Sets number for lines |


#### `new CheckboxField(label, name, text)`


Checkbox, single option input. It's *dynamic* field.
Compiled into:

```html
<input type="checkbox" name="{name}">{text}</input>
```

| Field  | Type      | Required | Description |
| ------ | --------- | -------- | ----------- |
| `text` | `String`  | `yes`    | Text label for checkbox |


#### `new RadioField(label, name, keyvals)`

Set of radio buttons. It's *dynamic* field.
*Example:* `keyvals = {key1: "val1", key2: "val2", key3: "val3"}` compiles into:

```html
<input type="radio" name="{name}" value="key1">val1</input>
<input type="radio" name="{name}" value="key2">val2</input>
<input type="radio" name="{name}" value="key3">val3</input>
```

| Field     | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| `keyvals` | `Object` | `yes`    | Object with key-values. Each object key is a `value`, each `keyvals` value is a content of input. |


#### `new SelectField(label, name, keyvals)`

Dropdown select box. It's *dynamic* field.
*Example:* `keyvals = {key1: "val1", key2: "val2", key3: "val3"}` compiles into:

```html
<select name="{name}">
  <option value="key1">val1</option>
  <option value="key2">val2</option>
  <option value="key3">val3</option>
</select>
```

| Field     | Type     | Required | Description |
| --------- | -------- | -------- | ----------- |
| `keyvals` | `Object` | `yes`    | Object with key-values. Each object key is a `value`, each `keyvals` value is a content of option. |


#### `new ImageUploadField(label, name)`

Image upload input. It's *dynamic* field.

```html
<input type="file" name="{name}">
```


## ApiError

To catch all API errors use [Bluebird's filtered catch](http://bluebirdjs.com/docs/api/catch.html#filtered-catch).

```js
const Anticaptcha = require('anticaptcha2');

...

anticaptcha.solve(task)
  .then(res => {
      ...
  })
  .catch(Anticaptcha.ApiError, err => {
      console.error('Anticaptcha API error:', err)
  })
;
```
