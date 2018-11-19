# AntiCaptcha2
## *Draft*

## Table of contents
- [Features](#0)
- [Anticaptcha](#1)
- [Proxy](#1)
- [Tasks](#2)
- [FormBuilder](#3)
- [Fields](#4)

---

## Features


## Anticaptcha

`new Anticaptcha(apikey, proxy)`
`Anticaptcha.getProxy()`
`Anticaptcha.setProxy(proxy)`
`Anticaptcha.method(method, data, isPrivate)`
`Anticaptcha.getBalance()`
`Anticaptcha.getQueueStats(queueId)`
`Anticaptcha.createTask(opts = {/*task:{}, ?softId, ?languagePool, ?callbackUrl*/})`
`Anticaptcha.getTaskResult(taskId)`
`Anticaptcha.reportIncorrectImageCaptcha(taskId)`
`Anticaptcha.test(data)`
`Anticaptcha.getTaskResult2(taskId, opts = {/*waitTime, step = 0*/})`
`Anticaptcha.solve(task, opts = {/*?softId, ?languagePool, ?callbackUrl*/})`

## Proxy

`['http', 'socks4', 'socks5']`
`new Proxy(data = {})`
`Proxy.set(data = {}, reset = false)`
`Proxy.get()`
`Proxy.toJSON(check = false)`
`Proxy.checkProxy(proxyData)`



## Task

`new Task(types /*=[typeProxyLess, typeProxy]*/, data, proxy, waitTime)`
`Task.type`
`Task.data (get)`
`Task.data (set)`
`Task.proxy (get)`
`Task.proxy (set)`
`Task.toJSON(data)`

## Tasks

### `NoCaptchaTask(otps = {/*url, sitekey, ?stoken, ?isVisible*/}, proxy)`
### `FunCaptchaTask(otps = {/*url, publickey*/}}, proxy)`
### `GeeTestTask(otps = {/*url, gt, challenge*/}}, proxy)`
### `ImageToTextTask(otps = {/*body, ?phrase, ?case, ?numeric, ?math, length, ?comment*/}})`
### `SquareNetTextTask(otps = {/*body, name, size:[rowsCount, columnsCount]*/}})`
### `CustomCaptchaTask(otps = {/*url, assignment, forms*/}})`

## FormBuilder

`new FormBuilder()`
`FormBuilder.add(Field)`
`FormBuilder.remove(id)`
`FormBuilder.toJSON()`

## Fields

`TextField(label, text)`
`LinkField(label, url, text)`
`ImageField(label, url)`
`TextboxField(label, name, opts = {/*placeholder, width*/})`
`TextareaField(label, name, opts = {/*placeholder, width, rows*/})`
`CheckboxField(label, name, text)`
`RadioField(label, name, keyvals = {})`
`SelectField(label, name, keyvals = {})`
`ImageUploadField(label, name)`
