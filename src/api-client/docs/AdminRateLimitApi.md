# AdminRateLimitApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**rateLimitAdminControllerAdd**](#ratelimitadmincontrolleradd) | **POST** /admin/rate/add/{userId} | |
|[**rateLimitAdminControllerAdjust**](#ratelimitadmincontrolleradjust) | **POST** /admin/rate/adjust/{userId} | |
|[**rateLimitAdminControllerReset**](#ratelimitadmincontrollerreset) | **POST** /admin/rate/reset/{userId} | |
|[**rateLimitAdminControllerSuspend**](#ratelimitadmincontrollersuspend) | **POST** /admin/rate/suspend/{userId} | |
|[**rateLimitAdminControllerUnsuspend**](#ratelimitadmincontrollerunsuspend) | **POST** /admin/rate/unsuspend/{userId} | |

# **rateLimitAdminControllerAdd**
> rateLimitAdminControllerAdd(addBodyDto)


### Example

```typescript
import {
    AdminRateLimitApi,
    Configuration,
    AddBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminRateLimitApi(configuration);

let userId: string; // (default to undefined)
let addBodyDto: AddBodyDto; //

const { status, data } = await apiInstance.rateLimitAdminControllerAdd(
    userId,
    addBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addBodyDto** | **AddBodyDto**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rateLimitAdminControllerAdjust**
> rateLimitAdminControllerAdjust(adjustBodyDto)


### Example

```typescript
import {
    AdminRateLimitApi,
    Configuration,
    AdjustBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminRateLimitApi(configuration);

let userId: string; // (default to undefined)
let adjustBodyDto: AdjustBodyDto; //

const { status, data } = await apiInstance.rateLimitAdminControllerAdjust(
    userId,
    adjustBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **adjustBodyDto** | **AdjustBodyDto**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rateLimitAdminControllerReset**
> rateLimitAdminControllerReset()


### Example

```typescript
import {
    AdminRateLimitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminRateLimitApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.rateLimitAdminControllerReset(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rateLimitAdminControllerSuspend**
> rateLimitAdminControllerSuspend(suspendBodyDto)


### Example

```typescript
import {
    AdminRateLimitApi,
    Configuration,
    SuspendBodyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminRateLimitApi(configuration);

let userId: string; // (default to undefined)
let suspendBodyDto: SuspendBodyDto; //

const { status, data } = await apiInstance.rateLimitAdminControllerSuspend(
    userId,
    suspendBodyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **suspendBodyDto** | **SuspendBodyDto**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rateLimitAdminControllerUnsuspend**
> rateLimitAdminControllerUnsuspend()


### Example

```typescript
import {
    AdminRateLimitApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AdminRateLimitApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.rateLimitAdminControllerUnsuspend(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

