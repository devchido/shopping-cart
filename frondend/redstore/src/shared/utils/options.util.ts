export const buildOptionObject = (obj: any, fieldValue: string, fieldLabel: string, label?: any, value?: any) => ({ ...obj, value: value || obj[fieldValue], label: label || obj[fieldLabel] })

export const buildOptionAssetTypeLabel = (assetType: any) => (`${assetType?.name} - ${assetType?.code}`)

export const buildOptionAssetGroupLabel = (assetGroup: any) => (`${assetGroup?.name} - ${assetGroup?.code}`)

export const buildOptionAssetClassLabel = (assetClass: any) => (`${assetClass?.name} - ${assetClass?.code}`)

export const buildOptionBuildingLabel = (building: any) => (`${building?.province?.locationCode} ${(building?.province?.locationCode && building?.name) ? ' - ' : ''} ${building?.name}`)

export const buildOptionDepartmentLabel = (department: any) => (`${department?.displayName} - ${department?.code} `)

export const buildOptionProvinceLabel = (province: any) => (`${province?.locationNameVn}`)

export const buildOptionBranchLabel = (building: any) => (`${building?.name}`)

export const buildOptionFloorLabel = (floor: any) => (`${floor?.name}`)

export const buildOptionUser = (obj: any) => ({ value: obj, label: obj.account });