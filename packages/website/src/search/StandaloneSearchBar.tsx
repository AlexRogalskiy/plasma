import '@styles/plasmaSearchBar.scss';

import {useEffect, useState, FunctionComponent, useContext} from 'react';
import {buildStandaloneSearchBox, StandaloneSearchBox} from '@coveo/headless';
import React from 'react';
import {Button, IItemBoxProps, ListBox, Svg, UrlUtils} from '@coveord/plasma-react';

import classNames from 'classnames';
import {EngineContext} from './engine/EngineContext';

interface SearchBarProps {
    controller: StandaloneSearchBox;
}
const SearchBoxRerender: FunctionComponent<SearchBarProps> = (props) => {
    const {controller} = props;
    const [state, setState] = useState(controller.state);

    useEffect(() => controller.subscribe(() => setState(controller.state)), []);

    useEffect(() => {
        const {redirectTo, value} = controller.state;
        if (redirectTo) {
            const data = {value};
            window.location.href = `${redirectTo}?query=${data.value}`;
        }
    }, [state.redirectTo]);

    const ClearButton = () => (
        <button
            disabled={state.value === ''}
            className={classNames('clear-button', {
                'search-not-empty': state.value !== '',
            })}
            onClick={() => {
                controller.updateText('');
                controller.submit();
            }}
        >
            <Svg svgName="cross" svgClass="icon" />
        </button>
    );

    const SearchButton = () => (
        <Button
            classes={['search-button']}
            onClick={() => {
                controller.submit();
                alert(`rawValue: ${state.suggestions[0].rawValue}`);
            }}
        >
            <Svg svgName={'search'} className="icon mod-stroke" />
        </Button>
    );

    const SuggestionListBox = () => {
        const results: IItemBoxProps[] = state.suggestions.map((s) => ({
            value: s.rawValue,
            displayValue: s.highlightedValue,
        }));

        return (
            <>
                {(state.suggestions.length > 0 || state.isLoadingSuggestions) && (
                    <ListBox
                        classes={['search-results-container']}
                        isLoading={state.isLoadingSuggestions}
                        items={results}
                        onOptionClick={() => controller.submit()}
                    />
                )}
            </>
        );
    };

    return (
        <div className="plasmaSearchBar">
            <form
                autoComplete="off"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    className="search-bar"
                    type="search"
                    placeholder={'Find a component...'}
                    value={state.value}
                    onChange={(event) => controller.updateText(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && controller.submit()}
                />
                <ClearButton />
                <SearchButton />
                <SuggestionListBox />
            </form>
        </div>
    );
};

const StandaloneSearchBar = () => {
    const engine = useContext(EngineContext);
    const options = {redirectionUrl: '#/plasma-search/ResultPage'};
    const controller = buildStandaloneSearchBox(engine, {options});
    return <SearchBoxRerender controller={controller} />;
};

export default StandaloneSearchBar;
