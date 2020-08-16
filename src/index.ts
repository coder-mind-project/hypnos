import IExpress from './03_infra/interfaces/dependencyInjection/IExpress';
import express from 'express';
import services from './03_infra/services';

const app = <IExpress>express();

services.configurePublicResources(express);
services.configure(app);
services.configureActions(app);
services.start(app);
