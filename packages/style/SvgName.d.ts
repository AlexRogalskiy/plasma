export type SvgName =
	| 'accessPrivate'
	| 'accessSecured'
	| 'accessShared'
	| 'activate'
	| 'activity'
	| 'add'
	| 'ai16px'
	| 'apply16px'
	| 'apply24px'
	| 'apply32px'
	| 'arrowBottom'
	| 'arrowBottomRounded'
	| 'arrowDownInCircle'
	| 'arrowHeadBottomStrokedLarge'
	| 'arrowHeadBottomStrokedMedium'
	| 'arrowHeadBottomStrokedSmall'
	| 'arrowHeadTopStrokedLarge'
	| 'arrowHeadTopStrokedMedium'
	| 'arrowHeadTopStrokedSmall'
	| 'arrowLeft'
	| 'arrowLeftReturn'
	| 'arrowLeftRounded'
	| 'arrowRight'
	| 'arrowRightLink'
	| 'arrowRightRounded'
	| 'arrowTop'
	| 'arrowTopRounded'
	| 'arrowTopSlim'
	| 'ascDesc'
	| 'askAlex'
	| 'associate'
	| 'availability'
	| 'average'
	| 'behaviouralAnalytics16px'
	| 'behaviouralAnalytics24px'
	| 'bellStrokedMedium'
	| 'bgWave'
	| 'body'
	| 'brain'
	| 'bubble16px'
	| 'bubble32px'
	| 'cancel'
	| 'card16px'
	| 'card32px'
	| 'cardDataAddContent'
	| 'cardGraphAddContent'
	| 'cardMove'
	| 'cardTableAddContent'
	| 'cardTypeBarChartHorizontal'
	| 'cardTypeBarChartVertical'
	| 'cardTypeBubbleChart'
	| 'cardTypeDetailedStatistics'
	| 'cardTypeLineChartBar'
	| 'cardTypeLineChartLine'
	| 'cardTypeMap'
	| 'cardTypeNote'
	| 'cardTypePieChartDonut'
	| 'cardTypePieChartPie'
	| 'cardTypeQuickMetric'
	| 'cardTypeTrend'
	| 'catalogSourceSm'
	| 'chartDown'
	| 'chartNew'
	| 'chartStable'
	| 'chartUp'
	| 'check'
	| 'checkNotAllSelected'
	| 'checkStrokedLarge'
	| 'checkStrokedMedium'
	| 'checkStrokedSmall'
	| 'checkmark'
	| 'clear'
	| 'clearSmall'
	| 'clock16px'
	| 'clock24px'
	| 'close'
	| 'cloud'
	| 'cloudLightStroked16'
	| 'cloudLightStroked24'
	| 'cloudLightStroked32'
	| 'clouds'
	| 'commerce16px'
	| 'condition'
	| 'copy'
	| 'coveoIcon16px'
	| 'crawlingBot'
	| 'crawlingBotStroked16'
	| 'crawlingBotStroked24'
	| 'crawlingBotStroked32'
	| 'criticalStrokedLarge'
	| 'criticalStrokedMedium'
	| 'criticalStrokedSmall'
	| 'cross'
	| 'dashboard'
	| 'dashboardAddcard'
	| 'dashboardDuplicate'
	| 'dashboardReset'
	| 'dashboardSave'
	| 'database'
	| 'database16px'
	| 'dateToday'
	| 'delete'
	| 'details'
	| 'disable'
	| 'domainGoogle'
	| 'domainOffice365'
	| 'domainSalesforce'
	| 'domainSaml'
	| 'domainSamlGradient'
	| 'download'
	| 'dragDrop'
	| 'dropdownDate'
	| 'dropdownTime'
	| 'duplicate'
	| 'ecommerceYellow'
	| 'edit'
	| 'elastic'
	| 'email'
	| 'email16px'
	| 'emailSent'
	| 'enterprise16px'
	| 'enterprise24px'
	| 'enterprise32px'
	| 'exclamationMarkInCircle'
	| 'exclamationMarkInFullCircle'
	| 'exclude'
	| 'exit'
	| 'expand'
	| 'expendTableRight'
	| 'exploreSampleDataset'
	| 'explorer'
	| 'explorerExpand'
	| 'export'
	| 'exportagain'
	| 'external'
	| 'file16px'
	| 'file24px'
	| 'file32px'
	| 'filter'
	| 'filterAdd'
	| 'filterFacet'
	| 'flagAu'
	| 'flagEu'
	| 'flagUs'
	| 'flecheStratus'
	| 'folderClose'
	| 'folderLock'
	| 'folderOpen'
	| 'ftAttachment'
	| 'ftCalendar'
	| 'ftCase'
	| 'ftCustom'
	| 'ftDocument'
	| 'ftFeaturedResult'
	| 'ftFile'
	| 'ftFolder'
	| 'ftImages'
	| 'ftKb'
	| 'ftLink'
	| 'ftList'
	| 'ftMail'
	| 'ftRankingRules'
	| 'ftSalesforceDoctypeExcel'
	| 'ftSalesforceDoctypeFlash'
	| 'ftSalesforceDoctypeGdoc'
	| 'ftSalesforceDoctypeHtml'
	| 'ftSalesforceDoctypeImage'
	| 'ftSalesforceDoctypePack'
	| 'ftSalesforceDoctypePdf'
	| 'ftSalesforceDoctypePpt'
	| 'ftSalesforceDoctypeVisio'
	| 'ftSalesforceDoctypeWord'
	| 'ftSalesforceStandardAccount'
	| 'ftSalesforceStandardArticle'
	| 'ftSalesforceStandardCampaign'
	| 'ftSalesforceStandardContact'
	| 'ftSalesforceStandardContract'
	| 'ftSalesforceStandardDashboard'
	| 'ftSalesforceStandardDefault'
	| 'ftSalesforceStandardEmail'
	| 'ftSalesforceStandardEvent'
	| 'ftSalesforceStandardFeed'
	| 'ftSalesforceStandardFeedback'
	| 'ftSalesforceStandardFile'
	| 'ftSalesforceStandardGoals'
	| 'ftSalesforceStandardGroups'
	| 'ftSalesforceStandardInsights'
	| 'ftSalesforceStandardLead'
	| 'ftSalesforceStandardNote'
	| 'ftSalesforceStandardOpportunity'
	| 'ftSalesforceStandardOrders'
	| 'ftSalesforceStandardPost'
	| 'ftSalesforceStandardProduct'
	| 'ftSalesforceStandardQuestionFeed'
	| 'ftSalesforceStandardQuotes'
	| 'ftSalesforceStandardRelatedList'
	| 'ftSalesforceStandardReport'
	| 'ftSalesforceStandardTask'
	| 'ftSalesforceStandardTeamMember'
	| 'ftSalesforceStandardTopic'
	| 'ftUser'
	| 'ftVideo'
	| 'ftWebpage'
	| 'fullview'
	| 'gear'
	| 'githubMark'
	| 'groupMember'
	| 'hamburger'
	| 'headset'
	| 'headset16px'
	| 'headset216px'
	| 'headset24px'
	| 'headset32px'
	| 'help'
	| 'helpNoFill'
	| 'helpNoFill18'
	| 'hide'
	| 'history'
	| 'home'
	| 'home16px'
	| 'ideaStrokedLarge'
	| 'ideaStrokedMedium'
	| 'ideaStrokedSmall'
	| 'identityGroup'
	| 'identityUser'
	| 'inAppTeaser'
	| 'index'
	| 'indexWebsite'
	| 'info'
	| 'info14'
	| 'infoReversed'
	| 'infoStrokedLarge'
	| 'infoStrokedMedium'
	| 'infoStrokedSmall'
	| 'interfaceEditor'
	| 'invert'
	| 'keyStroked16'
	| 'keyStroked24'
	| 'keyStroked32'
	| 'labelValue'
	| 'learningHat16px'
	| 'learningHat24px'
	| 'learningHat32px'
	| 'lightning'
	| 'limiSizeStorage'
	| 'limitDocument'
	| 'limitSizeData'
	| 'limitSizeFile'
	| 'limitSource'
	| 'limitUser'
	| 'link'
	| 'lock'
	| 'logo'
	| 'logoBlue'
	| 'logoCloud'
	| 'logoSymbol'
	| 'logoSymbolOriginal'
	| 'logoWhite'
	| 'logout'
	| 'logoutStrokedMedium'
	| 'logs'
	| 'maintenance'
	| 'mappingExtractionLiteral'
	| 'mappingExtractionMetadata'
	| 'mappingExtractionScript'
	| 'menu'
	| 'menuAnalytics'
	| 'menuContent'
	| 'menuInfrastructure'
	| 'menuLock'
	| 'menuOptimization'
	| 'menuOrganization'
	| 'menuPermissions'
	| 'messageAlert'
	| 'messageAuthentification'
	| 'messageError'
	| 'minus'
	| 'minus16px'
	| 'minus32px'
	| 'more'
	| 'moreAppend'
	| 'moveNewFile'
	| 'movetonewfile'
	| 'multipleChannel'
	| 'noContent'
	| 'notGroupMember'
	| 'noteNo'
	| 'noteYes'
	| 'notification'
	| 'open'
	| 'organization16px'
	| 'organization24px'
	| 'organization32px'
	| 'paintBucket16px'
	| 'paintBucket24px'
	| 'paintBucket32px'
	| 'pause'
	| 'peak'
	| 'people'
	| 'pin'
	| 'play'
	| 'plus'
	| 'plus16px'
	| 'plus32px'
	| 'polygons'
	| 'previewError'
	| 'pricetag'
	| 'product'
	| 'push16px'
	| 'push24px'
	| 'push32px'
	| 'pushSourceSm'
	| 'questionStrokedLarge'
	| 'questionStrokedMedium'
	| 'questionStrokedSmall'
	| 'readyToReceiveContent24px'
	| 'readyToReceiveContent32px'
	| 'rectangle'
	| 'refresh'
	| 'remove'
	| 'reorder'
	| 'rocket'
	| 'salesforce'
	| 'salesforceSansNuage'
	| 'search'
	| 'search16px'
	| 'select'
	| 'sendEmail'
	| 'setToNow'
	| 'settings'
	| 'setto'
	| 'share'
	| 'shield'
	| 'singleChannel'
	| 'sitemapSourceSm'
	| 'slack'
	| 'sliderHandle'
	| 'sortAsc'
	| 'sortDesc'
	| 'sortedAsc'
	| 'sortedDesc'
	| 'sourceAha'
	| 'sourceAll'
	| 'sourceAmazonS3'
	| 'sourceBox'
	| 'sourceCatalog'
	| 'sourceClearspace'
	| 'sourceConfluence'
	| 'sourceConfluence2'
	| 'sourceConfluence2Cloud'
	| 'sourceCustom'
	| 'sourceDatabase'
	| 'sourceDesktop'
	| 'sourceDiscourse'
	| 'sourceDocumentum'
	| 'sourceDropbox'
	| 'sourceDropboxForBusiness'
	| 'sourceDrupal'
	| 'sourceDynamics'
	| 'sourceEktronCms'
	| 'sourceEvernote'
	| 'sourceFacebook'
	| 'sourceFileSystem'
	| 'sourceGenericRest'
	| 'sourceGmail'
	| 'sourceGoogleDriveDomainWide'
	| 'sourceGoogleSites'
	| 'sourceGoogleplus'
	| 'sourceJira'
	| 'sourceJiraCloud'
	| 'sourceJive'
	| 'sourceJiveCloud'
	| 'sourceKhoros'
	| 'sourceKnowledgebase'
	| 'sourceLdap'
	| 'sourceLiferay'
	| 'sourceLinkedin'
	| 'sourceLithium'
	| 'sourceLitmos'
	| 'sourceMail'
	| 'sourceMicrosoftDynamics'
	| 'sourceMicrosoftactivedirectory'
	| 'sourceMicrosoftdynamics'
	| 'sourceNotes'
	| 'sourceOneDrive'
	| 'sourceOracleKnowledge'
	| 'sourceOracleUcm'
	| 'sourceOutlook'
	| 'sourceProductalert'
	| 'sourcePush'
	| 'sourceQueue'
	| 'sourceReviewboard'
	| 'sourceRss'
	| 'sourceSalesforce'
	| 'sourceSalesforceContent'
	| 'sourceServicenow'
	| 'sourceSharepoint'
	| 'sourceSharepointLegacy'
	| 'sourceSharepointOnline'
	| 'sourceSitecore'
	| 'sourceSitemap'
	| 'sourceSymantecEnterpriseVault'
	| 'sourceTargetProcess2'
	| 'sourceTwitter'
	| 'sourceWeb'
	| 'sourceWeb2'
	| 'sourceWebscraper'
	| 'sourceWebsphereWcm'
	| 'sourceWindchill'
	| 'sourceYahoo'
	| 'sourceYammer'
	| 'sourceYoutube'
	| 'sourceZendesk'
	| 'star'
	| 'star16px'
	| 'star24px'
	| 'star32px'
	| 'status'
	| 'statusLimiteSource'
	| 'statusLimiteUser'
	| 'statusOrgBackup'
	| 'statusOrgExpiration'
	| 'statusOrgReadOnly'
	| 'statusOrgStop'
	| 'statusSearchDown'
	| 'statusTooLong'
	| 'stop'
	| 'success24px'
	| 'success32px'
	| 'table'
	| 'thumbDown'
	| 'thumbUp'
	| 'tips'
	| 'trendDown'
	| 'trendNew'
	| 'trendStable'
	| 'trendUp'
	| 'triangle'
	| 'unchecked'
	| 'unlink'
	| 'unlock'
	| 'unlockStroked16'
	| 'unlockStroked24'
	| 'unlockStroked32'
	| 'update'
	| 'updateFullRefresh'
	| 'updateIncRefresh'
	| 'updateRebuild'
	| 'upload'
	| 'userStrokedLarge'
	| 'userStrokedMedium'
	| 'variant'
	| 'variants'
	| 'view'
	| 'warningStrokedLarge'
	| 'warningStrokedMedium'
	| 'warningStrokedSmall'
	| 'web'
	| 'webSourceSm'
	| 'websiteSearchGreen'
	| 'youtubeSourceSm'
	| 'zoomNegative'
	| 'zoomPositive';
