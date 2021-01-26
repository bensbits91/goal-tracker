import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GoalTrackerWebPartStrings';
import GoalTracker from './components/GoalTracker';
import { IGoalTrackerProps } from './components/IGoalTrackerProps';

export interface IGoalTrackerWebPartProps {
  description: string;
  context: any;
}

export default class GoalTrackerWebPart extends BaseClientSideWebPart <IGoalTrackerWebPartProps> {

  public render(): void {
    console.log('%c : GoalTrackerWebPart -> render -> this.context', 'color:white;background-color:black;', this.context);
    const element: React.ReactElement<IGoalTrackerProps> = React.createElement(
      GoalTracker,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
